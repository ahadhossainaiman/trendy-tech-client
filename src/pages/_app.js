import { store } from '@/redux/store'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
 
  return (
      <Provider store={store}>
         <ToastContainer />
        {
           getLayout(<Component {...pageProps} />)
        }
      
       </Provider>
       
  )
}