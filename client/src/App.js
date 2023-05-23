import { Layout } from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import {ServicesPage} from './pages/ServicesPage'
import {TasksPage} from './pages/TasksPage'
import { MyServicesPage } from './pages/MyServicesPage'
import { MyTasksPage } from './pages/MyTasksPage.jsx'
import { ServicePage } from './pages/ServicePage'
import { TaskPage } from './pages/TaskPage.jsx'

import { AddServicePage } from './pages/AddServicePage'
import { MyProfilePage } from './pages/MyProfilePage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { EditServicePage } from './pages/EditServicePage.jsx'
import { EditTaskPage } from './pages/EditTaskPage.jsx'
import {AddTaskPage} from './pages/AddTaskPage'
import {ChatsPage} from './pages/ChatsPage.jsx'
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
                <Route path='services/my-services' element={<MyServicesPage />} />
                <Route path='tasks/my-tasks' element={<MyTasksPage />} />
                <Route path='services/:id' element={<ServicePage />} />
                <Route path='services/:id/edit' element={<EditServicePage />} />
                <Route path='tasks/:id' element={<TaskPage />} />
                <Route path='tasks/:id/edit' element={<EditTaskPage />} />
                <Route path='services/create-service' element={<AddServicePage />} />
                <Route path='tasks/create-task' element={<AddTaskPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='profile' element={<MyProfilePage />} />
                <Route path='chats' element={<ChatsPage />} />
                <Route path='chats/:id' element={<ChatsPage />} />
            </Routes>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                
        </Layout>
    )
}

export default App
