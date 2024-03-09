import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'

const SignUp = () => {

  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(null)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id] : e.target.value.trim() })

  }
  console.log(formData);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( !formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please Fill out All Feilds')
    }

    try {

        setLoading(true)
        setErrorMessage(null)
      const res = await fetch('/api/auth/signup',  {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message)
      }
      setLoading(false)

      if(res.ok){
        navigate('/sign-in')
      }

      
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
      
    }
  }



  return (
    <div className='min-h-screen mt-20 '>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* Left Side */}
        <div className="flex-1">
          <Link to='/' className=' text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg'>ELV Drive</span>
            Blog
          </Link>

          <p className='text-sm mt-5'>
            This is a demo project you can give 
          </p>
        </div>



        {/* Right */}
        <div className='flex-1'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div>
              <Label value='Your Username' />
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your Email' />
              <TextInput type='email' placeholder='Email' id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
            </div>

            <Button gradientDuoTone='purpleToPink' type='submit' >
              
              {
              loading ?
              <>
               <Spinner size='sm'/>
               <span className='p-3'>Loading... </span>
              </>

               : 'Sign Up'
              }
            </Button>
          </form>


          <div className='flex gap-2 mt-5 text-sm'>
            <span>Have an Account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>

          {
            errorMessage &&
            (<Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
            )
          }
 
        </div>
        
      </div>

    </div>
  )
}

export default SignUp