import { Box } from "@mui/material"
import Typography from "@mui/material/Typography";
const Index = () => {
  return (
     <Box component="section" sx={{ p: 2, border: '1px solid grey', width: '60%', height: '300px', p: '20px', background: '#f2f1f1', boxShadow: '1px 2px 5px 2px #ccc', margin: 'auto' }}>
      <Typography
        variant="p"
        color="#5C5C5C"
        component="div"
        mt={12}
        fontSize={20}
      >
     Thank you for submitting your Enrolment Application Form. ICV will process your enrolment application and notify you of the outcome shortly
     </Typography>
   </Box>
  )
}

export default Index