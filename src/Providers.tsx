import { Provider as ReduxProivder } from 'react-redux'
import store from  './Redux/store';
import { Web3ReactProvider } from '@web3-react/core'
import getLibrary from './utils/getLibrary';

const Providers = ( {children}:any ) => {
  return(
    <>
      <Web3ReactProvider getLibrary={getLibrary} >
        <ReduxProivder store={store}>
          {children}
        </ReduxProivder>
      </Web3ReactProvider>
    </>
  );
}
export default Providers;