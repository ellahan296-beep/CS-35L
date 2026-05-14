import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Button, Chip, Container, Paper, Typography } from '@mui/material'
import { getListing } from '../services/listingService'

export default function ListingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)

  // grab the listing when page loads
  useEffect(() => {
    getListing(id).then(data => {
      console.log('listing detail:', data)
      setListing(data)
    })
  }, [])

  // still loading
  if (!listing) return <Typography sx={{ mt: 4, textAlign: 'center' }}>Loading...</Typography>

  const imgs = JSON.parse(listing.images || '[]')

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Button 
        onClick={() => navigate('/listings')}
        sx={{ mb: 2, color: '#2d68c4' }}
      >
        ← Back
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {/* show images if there are any, optional */}
        {imgs.length > 0 && (
          <img
            src={`http://localhost:9999/${imgs[0]}`}
            alt={listing.title}
            style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
          />
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">{listing.title}</Typography>
          <Chip
            label={listing.status === 'sold' ? 'Sold' : 'Active'}
            sx={{ backgroundColor: '#e3f0ff', color: '#2d68c4' }}
          />
        </Box>

        <Typography variant="h5" color="#2d68c4" fontWeight="bold" mb={2}>
          ${listing.price}
        </Typography>

        <Typography color="text.secondary" mb={2}>{listing.description}</Typography>

        <Typography fontSize={13} color="text.secondary">{listing.category} · {listing.campus}</Typography>
      </Paper>
    </Container>
  )
}