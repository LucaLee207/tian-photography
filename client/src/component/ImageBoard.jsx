import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// ⬇️ Import the Masonry component from MUI Lab ⬇️
import Masonry from '@mui/lab/Masonry'; 

// --- DUMMY DATA ---
// NOTE: In a real app, this data would come from an API/Database
const itemData = [
  { img: 'https://images.unsplash.com/photo-1518756121406-b3b7825d8869', title: 'Fern', height: 164, },
  { img: 'https://images.unsplash.com/photo-1627308595536-de60032a1889', title: 'Honey', height: 20, },
  { img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25', title: 'Flowers', height: 120, },
  { img: 'https://images.unsplash.com/photo-1522770514175-d1e0807e781c', title: 'Camera', height: 250, },
  { img: 'https://images.unsplash.com/photo-1589118485293-131b7e46f6c8', title: 'Kitchen', height: 180, },
  { img: 'https://images.unsplash.com/photo-1522329760773-ac6230f657a7', title: 'Mushroom', height: 230, },
  { img: 'https://images.unsplash.com/photo-1567306301408-9b7470b888a3', title: 'Bike', height: 150, },
  { img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8', title: 'Breakfast', height: 260, },
  { img: 'https://images.unsplash.com/photo-1557053910-ac3b908c69d5', title: 'Water', height: 100, },
];

// Styled Paper component for the image items
const Label = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(0.5),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   borderBottomLeftRadius: 0,
//   borderBottomRightRadius: 0,
}));

function ImageBoard() {
  return (
    <Box sx={{ width: '90%', minHeight: 829, margin: 'auto' }}>
      <h2>Image Board Gallery</h2>
      
      {/* Masonry Component
        columns: Defines the number of columns. Uses responsive breakpoints.
        spacing: Defines the gutter space between items.
      */}
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg:4}} spacing={0}>
        {itemData.map((item, index) => (
          <div key={index}>
            <Label>
              {/* The image height is determined by the itemData to simulate 
                different aspect ratios, which is key to the Masonry layout.
              */}
              <img
                srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                src={`${item.img}?w=162&auto=format`}
                alt={item.title}
                loading="lazy"
                className="img-fluid"
                style={{
                  display: 'block',
                  width: '100%',
                }}
              />
            </Label>
          </div>
        ))}
      </Masonry>
    </Box>
  );
}

export default ImageBoard;