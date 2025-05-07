import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchLaunchById, fetchRocket } from '../api/api'
import {  Title, Text, Loader, Group, Box, Container } from '@mantine/core'
import { Carousel } from '@mantine/carousel';

const LaunchDetail: React.FC = () => {
  const { id } = useParams()
  const { data: launch, isLoading:isLaunchLoading  } = useQuery(['launch', id], () => fetchLaunchById(id!), { enabled: !!id })
  const { data: rocket, isLoading:isRocketLoading  } = useQuery(['rocket', launch?.rocket], () => fetchRocket(launch!.rocket), {
    enabled: !!launch
  })

  const slides = Array(3).fill(0).map((i) => (
    <Carousel.Slide key={i}>
      <Box className="detImage">
        <img
          src={launch?.links?.patch?.large}
          alt={launch?.name}
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>
    </Carousel.Slide>
  ));
  return (
    <Container className='content'>
      {
        (isLaunchLoading && isRocketLoading) ? 
        <Loader /> :
        <Group position="apart" mb="md">
          <Carousel
              withIndicators
              height="auto"
              slideSize="100%"
              slideGap="md"
              loop
              align="start"
              className='carContents'
            >
            {slides}
          </Carousel>
            <Box className='detContents'>
              <Title order={2}>{launch?.name}</Title>
              <Text>Date: {new Date(launch?.date_utc ?? '').toLocaleString()}</Text>
              <Title order={4} mt="md">Description:</Title>
              <Text>{launch?.details}</Text>
              { rocket && (
                <>
                  <Title order={4} mt="md">Rocket Info</Title>
                  <Text>Name: {rocket.name}</Text>
                  <Text>Type: {rocket.type}</Text>
                </>
              )}
            </Box>
        </Group>
      }
    </Container>
  )
}

export default LaunchDetail
