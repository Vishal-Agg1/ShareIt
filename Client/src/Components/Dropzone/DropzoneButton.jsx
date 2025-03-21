import { useRef,useState} from 'react';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import { Button, Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import classes from './DropzoneButton.module.css';
import { useSelector } from 'react-redux';
import axios from "axios"
export function DropzoneButton() {
  const theme = useMantineTheme();
  const openRef = useRef(null);
  //loading control
  const [loading, setLoading] = useState(false); 
  //status fo uplaod
  const [status,setstatus] = useState(false);
  const id = useSelector((state)=>{
    return state.auth.user;
  })
  const handleFileUpload = async (files) => {
    setLoading(true); // Start loading
    console.log("Uploading file...", files[0]);
    const file = files[0];
    const formdata = new FormData();
    formdata.append("file",file);
    formdata.append("id",id);
    try {
      const response = await axios.post("http://localhost:8000/v1/upload",formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if(response.data.success==true) alert("File Uploaded successfully")
      else{alert("Please Upload again")}
    } catch (error) {
      alert("error uploading file")
      console.log(error);
    }finally{setLoading(false);}
  
  };
  return (
    <div className={classes.wrapper}>
      <Dropzone 
        openRef={openRef}
        onDrop={handleFileUpload}
        className={classes.dropzone}
        radius="md"
        maxSize={30 * 1024 ** 2}
        loading={loading}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload size={50} color={theme.colors.blue[6]} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload size={50} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload resume</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
            are less than 30mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
            
    </div>
  );
}