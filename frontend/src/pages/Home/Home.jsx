import { useEffect } from 'react'
import { Channels, Chat } from './components'
import { io } from 'socket.io-client'
import { toast } from 'react-toastify'

const socket = io('/')

const Home = () => {
  useEffect(() => {
    // Обработчик успешного подключения
    socket.on('connect', () => {
      toast.success('Соединение установлено')
    })

    // Обработчик разрыва соединения
    socket.on('disconnect', (reason) => {
      toast.error('Соединение разорвано: ' + reason)
    })

    // Обработчик попытки переподключения
    socket.on('reconnect_attempt', (attemptNumber) => {
      toast.info(`Попытка переподключения №${attemptNumber}`)
    })

    // Очистка обработчиков при размонтировании компонента
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('reconnect_attempt')
    }
  }, [])

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Chat />
        </div>
      </div>
    </>
  )
}
export default Home
