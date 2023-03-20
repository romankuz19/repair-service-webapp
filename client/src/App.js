import { Layout } from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import {ServicesPage} from './pages/ServicesPage'
import {TasksPage} from './pages/TasksPage'
import { MyServicesPage } from './pages/MyServicesPage'
import { PostPage } from './pages/PostPage'
import { AddPostPage } from './pages/AddPostPage'
import { MyProfilePage } from './pages/MyProfilePage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { EditPostPage } from './pages/EditPostPage'
import {AddTaskPage} from './pages/AddTaskPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './redux/features/auth/authSlice.js'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<ServicesPage />} />
                <Route path='tasks' element={<TasksPage />} />
                <Route path='myservices' element={<MyServicesPage />} />
                <Route path=':id' element={<PostPage />} />
                <Route path=':id/edit' element={<EditPostPage />} />
                <Route path='createservice' element={<AddPostPage />} />
                <Route path='createtask' element={<AddTaskPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='myprofile' element={<MyProfilePage />} />
            </Routes>

            <ToastContainer position='bottom-right' />
        </Layout>
    )
}

export default App
