import React, { useEffect } from 'react';
import {useState} from 'react';
import './Collection.css';
import { styled } from '@mui/material';
import {
  Box,
  Typography,
  Button,
  AppBar,
  Tab,
  Tabs,
  Slider,
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import Chart from '../../components/CollectionChart/Chart';
import ListIcon from '@mui/icons-material/List';
import CheckCircleOutlineIcon from  '@mui/icons-material/CheckCircleOutline'; 
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch , useSelector } from 'react-redux';
import {FilterSet , FilterFormat} from '../../Redux/action/filterAction';
import {arrowClick} from '../../Redux/action/filterAction';
import Accordian from '../../components/Accordian/Accodian';
import NftCard from '../../components/NftCard/NftCard';
import Filter from '../../components/Filter/Filter';
import BarChart from '../../components/Chart/BarChart';
import ActivityList from '../../components/CollectionTable/ActivityList';
import { nftCardData ,ChartData } from '../../utils/data';
import { TabPanelProps } from '../../utils/type';

const RightItem = styled('div')({
  background:'linear-gradient(180deg, #182D43 0%, #0B2540 100%)',
  width:'100%',
  display:'grid',
})
const VerifyButton = styled(Button)({
  fontFamily: 'Font Awesome 5 Free',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '14px',
  color: '#7FF9E6',
  background:'transparent',
  border:'1px solid #7FF9E6',
  marginRight:'10px'
})
const FeaturedButton = styled(Button)({
  fontFamily: 'Font Awesome 5 Free',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '14px',
  color: '#00D2FF',
  background:'transparent',
  border:'1px solid #00D2FF',
})


//////////////////////////////////////////////////////////////////////Tabs customize;


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const MyTabs = styled(Tabs)({
  background:'transparent',
  // paddingBottom:'40px',
  // '& .MuiTabs-indicator':{
  //   backgroundColor:'transparent',
  // },
  '& .css-1aquho2-MuiTabs-indicator':{
    backgroundColor:'transparent',
    backgroundImage:"url('./assets/img/tabUnderline.png')",
    backgroundPosition:'center center',
    height:'12px'
  },
})
const MyTab = styled((props:any) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(18),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.5)',
    background:'transparent',
    borderRadius: '5px',
    width:'100px',
    padding:'10px',
    '&.Mui-selected': {
      color: 'white',
      backgroundColor:'transparent'
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);
/////////////////////////////////////////////////////////////////////////////////////////////////////
const FilterDrawer = styled('div')({
  background:'#0E1B29',
  position:'relative',
  padding:'30px',
  borderTopRightRadius:'10px',
  borderBottomRightRadius:'10px',
  marginTop:'10px',
  overflow:'auto',
  height:'100vh',
  transitionDuration: '1s',
})
const FilterFontStyle = {
  fontFamily: 'Rubik',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  color: '#FFFFFF',
  marginBottom:'10px'
}
const RangeFontStyle = {
  fontFamily: 'Rubik',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '17px',
  color: '#CCCCCC',
}
const MyRange = styled(Slider)({
  color: '#0B354D',
  height: 15,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .css-14pt78w-MuiSlider-rail':{
    background:'#071421'
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#00D2FF',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
});
const useStyles = makeStyles({
  customOutline: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1B6A97",
    },
    '&.css-kszx2i-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root':{
      height:'32px',
    }
  },
  icon: {
    fill: 'white !important',
  },
});
const cardRectStyle = {
  display:'flex',
  flexWrap:'wrap',
  
  // marginTop:'30px',
  // height:'80vh',
  // overflow:'auto',
}
const ClearButton = styled(Button)({
  background:'transparent',
  fontFmily: 'Rubik',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '17px',
  color:  '#7FF9E6',
  marginTop:'-3px'
})


const fill:String[] = [];
const Collection = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchFlag,setSearchFlag] = useState<boolean>(false);
  const [tempSearchValue,setTempSearchValue] = useState([{
    name:'',title:'',money:0,img:''}
  ]);
  const [value, setValue] = useState(0);
  const [clearButtonFlag , setClearButtonFlag] = useState(false)
  const [removeList,setRemoveList] = useState<number>(-1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [rangeValue, setRangeValue] = useState<number>(30);

  const handleRangeChange = (event: Event, newRValue: number | number[]) => {
    setRangeValue(newRValue as number);
  };
  const dispatch = useDispatch();
  const filterState = useSelector((state:any) => state.filter.value);
  const [sort, setSort] = useState('');
  const filterList:String[] = useSelector((list:any) => list.filter.filterList);
  const handleChangeSort = (event: SelectChangeEvent) => {
    let tempSort = event.target.value;
    setSort(event.target.value);
    console.log("sort:::::",event.target.value);
    switch(tempSort){
      case 'High':
        console.log("HighClick:::",
          nftCardData.sort((a: any, b: any) => b.money - a.money))
        tempSearchValue.sort((a: any, b: any) => b.money - a.money)
      break
      case 'Low':
        console.log("LowClick:::",
          nftCardData.sort((a: any, b: any) => a.money - b.money))
          tempSearchValue.sort((a: any, b: any) => a.money - b.money)
      break
      default:
    }
  };
  const handleClear = () => {
    setClearButtonFlag(true);
    dispatch(FilterFormat(true));
    dispatch(FilterSet(fill));
    console.log("filterList",filterList);
  }
  const removeFilter = (nId:any) => {
    setRemoveList(nId);
    console.log("removeList",removeList);
    
    filterList.splice(nId,1);
    dispatch(FilterSet(filterList));
    
  }
  const classes = useStyles();

  const handleSearchValue = (event:any) => {
    setTempSearchValue([{
      name:'',title:'',money:0,img:''}
    ])
    setSearchValue(event.target.value);
    searchValue === '' ? setSearchFlag(false) : setSearchFlag(true);
    setTempSearchValue(nftCardData.filter( (info) => info.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }


  useEffect( () => {
    searchValue === '' ? setSearchFlag(false) : setSearchFlag(true);
  },[searchValue])
  return(
    <>
      <RightItem>
        <div className='top_body'>
          <div className='display-flex' style={{width:'40%'}}>
            <img className='markImg' src='./assets/img/profile.png' alt="markImg"></img>
            <div>
              <div className='ftitle'>Decimus Dynamics</div>
              <div className='fcontent'>It is the year 3081. The Earth is now a desolate landscape uninhabitable for the human race. A group of aliens, the Zeons invaded the Earth and decimated... read more</div>
              <VerifyButton size="small" startIcon={<CheckCircleOutlineIcon/>}>VERIFIED</VerifyButton>
              <FeaturedButton size="small" startIcon={<CheckCircleOutlineIcon/>}>FEATURED</FeaturedButton>
            </div>
          </div>
          <div className='chart-React'>
            {
              ChartData.map((info,index) => (
                <Chart key={index} title={info.title} content={info.content} img={info.img}/>
              ))
            }
          </div>
        </div>
        <AppBar position="static" sx={{background:'transparent',border:'none',boxShadow:'none'}}>
          <Box sx={{display:'flex',justifyContent:'center'}}>
            <MyTabs   value={value} onChange={handleChange} aria-label="basic tabs example">
              <MyTab icon={<ListIcon sx={{color:'#00D2FF'}}/>} iconPosition="start" label="Items" {...a11yProps(0)} />
              <MyTab icon={<AccessTimeIcon sx={{color:'#00D2FF'}}/> } iconPosition="start" label="Activity" {...a11yProps(1)} />
            </MyTabs>
          </Box>
        </AppBar>
        <Box sx={{display:'flex',width:'100%'}}>
          
            <FilterDrawer sx={{width:filterState ? '25%' : ''}}>
                <IconButton aria-label="fingerprint" sx={{color:'#00D2FF',position:'absolute',right:'5px',top:'5px'}} onClick={()=>dispatch(arrowClick(!filterState))}>
                    {filterState ? <KeyboardDoubleArrowLeftIcon />:<KeyboardDoubleArrowRightIcon />}
                </IconButton>
                {
                  filterState && 
                  <Box>
                    <Typography sx={FilterFontStyle}>Filter</Typography>
                    <Typography sx={RangeFontStyle}>Price Range: 2.7 ~ 50 ◎</Typography>
                    <MyRange  aria-label="Volume" value={rangeValue} onChange={handleRangeChange} />
                    <Accordian flag = {clearButtonFlag} setFlag = {setClearButtonFlag} removeList={removeList} />
                  </Box>
                }

            </FilterDrawer>
          <Box sx={{width:'100%'}}>
            <TabPanel value={value} index={0}>
              <div className='filter'>
                {
                  filterList.map((filterList:any,index:any) => (
                    <div onClick={()=>{removeFilter(index)}} key={index}>
                      <Filter filterName={filterList} index={index}/>   
                    </div>
                  )) 
                }
        
                {
                  filterList.length !== 0 && <ClearButton onClick={handleClear}>CLEAR ALL</ClearButton>
                }
              </div>
              <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                <div className="searchGroup">
                  <input type="text" className='searchBtn' name="search" placeholder="Search.." value={searchValue}  onChange={handleSearchValue} />
                  <i className="fa fa-search" style={{fontSize:'20px',color:'white'}}></i>
                </div>
                <FormControl sx={{marginLeft:1, minWidth: 180,maxWidth:180,width:180 }} classes={{ root: classes.customOutline}}>
                <Select
                  value={sort}
                  onChange={handleChangeSort}
                  displayEmpty
                  sx={{color:'white',height:'32px',background:'#071421'}}
                  inputProps = {{classes:{icon : classes.icon}}}
                 >
                  <MenuItem value='Default'>
                    <em>Sort: Low to High</em>
                  </MenuItem>
                  <MenuItem value='High'>Sort:High</MenuItem>
                  <MenuItem value='Low'>Sort:Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={cardRectStyle}>
              { !searchFlag && 
                nftCardData.map((card,index) => (
                  <NftCard key={index} name={card.name} title={card.title} money={card.money} img={card.img}/>
                ))
              }
              { searchFlag && 
                tempSearchValue.map((info,index) => (
                  <NftCard key={index} name={info.name} title={info.title} money={info.money} img={info.img}/>
                ))
              }
            </Box>
          </TabPanel>
            <TabPanel value={value} index={1}>
                <BarChart/>
                <ActivityList/>
            </TabPanel>
          </Box>
      </Box>
      </RightItem>
    </>
  );
}
export default Collection;
