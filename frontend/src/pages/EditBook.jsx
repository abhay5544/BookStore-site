import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
   const [title, setTitle] = useState('');
   const [author, setAuthor] = useState('');
   const [publishYear, setPublishYear] = useState('');
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const {id} = useParams();
   useEffect(() => {
     setLoading(true);
      axios.get(`http://localhost:5173/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear)
        setTitle(response.data.title)
        setLoading(true)
      }).catch((error) => {
         setLoading(false);
         alert('An error happened. Please Check console');
         console.log(error);
         
      })
   }, [])
   const handleEditBook = () => {
     const data = {
       title,
       author,
       publishYear,
     };
     setLoading(true);
     axios
      .put(`http://localhost:5173/books${id}`, data)
      .then(() => {
         setLoading(false);
         navigate('/')
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happend. Please Che')
      })
   };


  return (
    <div>Edit Book</div>
  )
}

export default EditBook

