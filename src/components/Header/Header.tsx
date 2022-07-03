import {styled} from '@mui/material/styles';
import {Stack,Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import WalletButton from '../WalletButton/WalletButton';
import './Header.css';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';


const BannerHeader = styled('div')({
  background:'rgba(19, 32, 45, 1)',
  padding:'30px',
  display:'flex',
  flexWrap:'wrap',
  justifyContent:'space-between',
  alignItems:'center',
})

const Header = () => {
  const { active, library, account } = useActiveWeb3React();
  const signer = library?.getSigner();
  console.log("signer::::",signer);
  console.log("Account",account);
  console.log("Active:::",active);
  return(
    <BannerHeader>
      <div className="example">
        <input className="searchbtn" type="text" placeholder="Search collection"></input>
        <SearchIcon sx={{color:'rgba(13, 103, 122, 1)'}}/>
      </div>
      <Stack direction="row" spacing={2} alignItems="center">
        <PersonIcon sx={{color:'white'}}/>
        <WalletButton>Connect</WalletButton>
      </Stack>
    </BannerHeader>
  );
}
export default Header;
