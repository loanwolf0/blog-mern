import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { signinStart, signInSuccess, signInFailure } from '../redux/user/userSlice'

const SignUp = () => {

  const [formData, setFormData] = useState({})
  const {loading, error:errorMessage} = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id] : e.target.value.trim() })

  }
  console.log(formData);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please Fill out All Feilds'))
    }

    try {

        dispatch(signinStart)
        // setLoading(true)
        // setErrorMessage(null)
      const res = await fetch('/api/auth/signin',  {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message))
      }

      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }

      
    } catch (error) {
      dispatch(signInFailure(error.message))
      
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
            This is a demo project you can signin with email or Goggle
          </p>
        </div>



        {/* Right */}
        <div className='flex-1'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            
            <div>
              <Label value='Your Email' />
              <TextInput type='email' placeholder='Email' id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='*********' id='password' onChange={handleChange} />
            </div>

            <Button gradientDuoTone='purpleToPink' type='submit' >
              
              {
              loading ?
              <>
               <Spinner size='sm'/>
               <span className='p-3'>Loading... </span>
              </>

               : 'Sign In'
              }
            </Button>
          </form>


          <div className='flex gap-2 mt-5 text-sm'>
            <span>Don't have an Account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
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