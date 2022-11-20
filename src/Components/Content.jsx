import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { Card, CardContent, CardMedia, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { Chip } from '@mui/material';
//=========// icons from mui icon //=======//
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
//=========// logo image //=======//
import Alibabalogo from '../images/alibabalogo.png';
//=========//Card data component link//=======//
import Data from './Data';

function Content() {

  

    let [allCategories, setAllCategories] = useState([])

  let categories = () => {
    let list = Data.map((e) => e.category);
    list = [...new Set([...list])];
    setAllCategories([...list]);
    console.log(list);
  }

  const [selectedCategory, setSelectedCategory] = useState([])

  let searchCategoryItem = (val) => {
    let filteredList = [];
    selectedCategory.forEach((y) => {
      filteredList = [...filteredList, ...Data.filter((x) => x.category === y && x.title.toLowerCase().includes(val.toLowerCase())),];
    });
    setFilteredList([...filteredList]);

  }


  const [filteredList, setFilteredList] = useState([]);

  // function for selected chip
  let selectChip = (val) => {
    let listArr = [...selectedCategory];
    listArr.push(val);
    listArr = [...new Set([...listArr])];

    let arr = [];

    listArr.forEach((x) => {
      arr = [...arr, ...Data.filter((e) => e.category === x)]
    })

    setFilteredList([...arr])
    setSelectedCategory([...listArr])

  }

  // function for removed chip

  let removeChip = (x) => {
    selectedCategory.splice(x, 1);
    setSelectedCategory([...selectedCategory]);
    let arr = []

    selectedCategory.forEach((y) => {
      arr = [...arr, ...Data.filter((e) => e.category === y)];
    });
    setFilteredList([...arr])
  }

 



  // useeffect Hook

  useEffect(() => {
    categories();
  }, []);

  return (
    <>
      <Box sx={{
        display: "flex", flexWrap: "wrap",
        justifyContent: "center", p: "0 !important", fontFamily: "Roboto"
      }}>

        <Box sx={{
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-around", alignItems: "center", width: 300, fontSize: 20, padding: "15px"
        }}>

          <Box sx={{ fontWeight: "bold" }}>
            Products
          </Box>
          <Box sx={{ fontSize: 16, '&:hover': { color: "black", fontWeight: "bold", textDecoration: "underline", fontSize: "20px" } }}>
            Manufacturers
          </Box>
        </Box>
        {/* idher sey border hata na h */}
        <Box
          sx={{ width: "100%", display: "flex" }}>
          <Box maxWidth='sm' sx={{ mx: 1 }}> <img alt="" src={Alibabalogo} width={180} height={60} /> </Box>
          <Box sx={{ width: "60%", display: "flex", alignItems: "center" }}>

            <Paper

              sx={{ display: 'flex', borderRadius: "25px", alignItems: 'center', width: 650 }}
            >
              <InputBase
                sx={{ ml: 1, padding: "0 4px ", flex: 1, borderRadius: 25, display: 'flex', alignItems: 'center' }}
                placeholder="What are you looking for..."
                inputProps={{ 'aria-label': 'What are you looking for...' }}

                onChange={(e) => searchCategoryItem(e.target.value)} />
              <Box
                sx={{ backgroundColor: "#fb7603", px: "40px", borderRadius: "0 25px 25px 0", display: "flex", alignItems: "center" }}>
                <IconButton type="button" sx={{ padding: '10px 0', display: "flex", alignItems: "center" }} aria-label="search">

                  <SearchIcon sx={{ color: "#ffffff", p: 0 }} />
                </IconButton>
                <Box sx={{ color: "white", fontSize: "20px", padding: "10px 5px", fontFamily: "Roboto" }}>Search</Box>
              </Box>
            </Paper>

          </Box>
          <Box sx={{ width: "40%", fontWeight: "100px", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
            <Box sx={{ fontSize: "14px", display: "flex", alignItems: "center" }}>
              <PersonOutlineOutlinedIcon sx={{ fontSize: 45 }} />
              <span>SignIn <br /> Join free</span>
            </Box>
            <Box sx={{ fontSize: 12, display: "flex", flexDirection: "column", alignItems: " center" }}>
              <TextsmsOutlinedIcon />
              <span>Messages</span>
            </Box>
            <Box sx={{ fontSize: 12, display: "flex", flexDirection: "column", alignItems: " center" }}>
              <PriceChangeOutlinedIcon />
              <span>Orders</span>
            </Box>
            <Box sx={{ fontSize: 12, display: "flex", fontFamily: "H", flexDirection: "column", alignItems: " center" }}>
              <ShoppingCartOutlinedIcon />
              <span>Card</span>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Chip Section */}
      <Box sx={{ border:"1px solid red",display: "flex", justifyContent: "center" }}>
        {selectedCategory && selectedCategory.length > 0 ? selectedCategory.map((x, i) =>
          <Chip key={i} variant="outlined" onDelete={() => removeChip(i)} label={x} />
        ) : null}


        {allCategories && allCategories.length > 0 ? allCategories.map((x, i) =>
          <Chip key={i} variant="outlined" onClick={() => selectChip(x)} label={x} />) : null}
      </Box>
      {/* Chip Section End*/}



      {/* Selecting Card  */}
      <Container>
        <Grid container sx={{ border: "1px solid blue", display: "flex", justifyContent: "space-around" }}>
          {/* <Container sx={{ border: "1px solid green",display:"flex"}}> */}
          {filteredList.map((e, i) => (
            <Grid item xl={2} lg={2} md={3} sm={6} xs={12} m={1} key={i}>
              <Card
                sx={{ maxWidth: "350%", border: "1px solid blue" }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={e.image}
                    width="100%"
                    alt={e.title}
                  />
                </Box>
                <CardContent>
                  <Tooltip title={e.title}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                      <Typography
                        sx={{ height: 60, overflow: "hidden" }}
                        variant="subtitle1"
                      >
                        {e.title.slice(0, 25) + (e.title.length > 25 ? "..." : "")}
                      </Typography>

                      {/* <FavoriteBorderIcon /> */}
                    </Box>
                  </Tooltip>

                  <Typography gutterBottom variant="h6" component="div">
                    {`${e.price}`}
                  </Typography>

                  <Typography sx={{ fontSize: 12 }} color="text.secondary" mt={2}>
                    {e.category} • {e.sold}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {/* </Container> */}
        </Grid>
      </Container>
      {/* Selecting Card  End */}



      {/* Map All cards  */}
      <Container>
        <Grid container sx={{ justifyContent: "space-around" }}>

          {Data.map((e, i) => (
            <Grid item xl={2} lg={2} md={2} sm={6} xs={12} m={1}
              key={i}
            >
              <Card
                sx={{ maxWidth: 290, height: 300, border: "1px solid blue" }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {/* <img src={e.image} width="100%" height="180px" alt={e.title} /> */}
                  <CardMedia
                    component="img"
                    height="180"
                    image={e.image}
                    width="100%"
                    alt={e.title}
                 
                  />
                </Box>
                <CardContent>
                  <Tooltip title={e.title}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                      <Typography
                        sx={{ height: 60, overflow: "hidden" }}
                        variant="subtitle1"
                      >
                        {e.title.slice(0, 25) + (e.title.length > 25 ? "..." : "")}
                      </Typography>

                    </Box>
                  </Tooltip>

                  <Typography gutterBottom variant="h6" component="div">
                    {`${e.price}`}
                  </Typography>

                  <Typography sx={{ fontSize: 12 }} color="text.secondary" mt={2}>
                    {e.category} • {e.sold}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {/* All Cards Ends*/}

        </Grid>

      </Container>
    </>
  );
}

export default Content;
