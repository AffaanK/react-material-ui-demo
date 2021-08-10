import React,{useState,useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DataList from './DataList';

const Form=() =>{

 
  const [ appData, setAppData ] = useState([{id: 1, title:'document1', description:'desc1', email:'test@test.com1', range: 32, valid: true }]);
  const [formData,setFormData]=useState({id: 2, title:'', description:'', email:'', range:0 , valid: false })
  const [errors,setErrors] =useState({titleError:false,emailError:false,rangeError:false,validError:false})
  const [nextId,setNextId] = useState(3)
  


useEffect(()=>{
  const localAppData = JSON.parse(localStorage.getItem("appData",appData));
  console.log(localAppData)
  if(localAppData!== null){
    setAppData(localAppData)
    setFormData()
  }
  else{
    setAppData([{id: 1, title:'document1', description:'desc1', email:'test@test.com1', range: 32, valid: true }])
    setFormData({id: (appData[appData.length-1]).id+1, title:'', description:'', email:'', range:0 , valid: false })
    setNextId((appData[appData.length-1]).id+2)
  }
},[appData])


  const submitForm=(e)=>{
    e.preventDefault();
    
    const {title,email,range,valid}= formData
    if(title==''|| !email.includes('@') ||range<0 || range>100 || valid==''){
      alert('missing or invalid Fields')
      return false
    }
    
    console.log(nextId)
    setFormData(prevState=>({...prevState,id:nextId}))

    console.log(formData)


    setAppData(prevAppState=>{
      return[
        ...prevAppState,formData
      ]
    })
    //store date into local storage
    localStorage.setItem("appData",appData);
    setNextId(nextId+1)
  }
  const onChange=(e)=>{
    if(e.target.type=='checkbox' && e.target.checked)
      setFormData({...formData,[e.target.name]:e.target.value})
    if(e.target.type!='checkbox')
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm">
      <ValidatorForm 
      onSubmit={submitForm}>
        
      <Typography variant="h6" gutterBottom>
        Dummy Form
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="title"
            name="title"
            label="Title"
            fullWidth
            autoComplete="title"
            onChange={onChange}
            helperText="title required."
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          required
          error={errors.emailError}
            id="email"
            name="email"
            label="Email"
            fullWidth
            onChange={onChange}
            helperText="Invalid email."

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            label="description"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="range"
            name="range"
            label="Range"
            fullWidth
            autoComplete="Range value"
            onChange={onChange}
            error={errors.rangeError}
            helperText="range required."
          />
        </Grid>  
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="valid" id="valid" value="yes" />}
            label="Valid"
            onChange={onChange}
          />
        </Grid>
         
        <Grid item xs={12}>
        <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>
        </Grid>

      </Grid>
     
      </ValidatorForm>


      <DataList dataList={appData} ></DataList>
      </Container>
    </React.Fragment>
  )
}
export default Form