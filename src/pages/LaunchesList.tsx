import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { fetchLaunches, Launch } from '../api/api'
import {
  Table,
  Loader,
  TextInput,
  Container,
  Box,
  Pagination,
  Button
} from '@mantine/core'
import { Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';

const PAGE_SIZE = 10

const LaunchesList: React.FC = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery<Launch[]>(['launches'], fetchLaunches)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('');
  const [activePage, setActivePage] = useState(1)
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key:string) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return []

    let launches = data.filter((launch) =>
      launch.name.toLowerCase().includes(search.toLowerCase().trim())
    )

    launches.sort((a:any, b:any) => {
      const valA = String(a[sortKey]).toLowerCase();
      const valB = String(b[sortKey]).toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    })

    return launches
  }, [data, search, sortAsc])

  const paginatedData = useMemo(() => {
    const start = (activePage - 1) * PAGE_SIZE
    return filteredData.slice(start, start + PAGE_SIZE)
  }, [filteredData, activePage])

  return (
    <Container className='content'>
      {
        isLoading ? 
        <Loader /> :
        <>
          <TextInput
            placeholder="Search launches..."
            value={search}
            onChange={(e) => {  
              setSearch(e.currentTarget.value)
              setActivePage(1)
            }}
            icon={<IconSearch size={16} stroke={1.5} />}
            w="100%"
          />
          <Box style={{width:'100%'}}>
            <Table className='tableCont'>
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')}>Name {sortKey === 'name' ? (sortAsc ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />) : <IconSelector size={14} />}</th>
                  <th onClick={() => handleSort('date_utc')}>Date {sortKey === 'date_utc' ? (sortAsc ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />) : <IconSelector size={14} />}</th>
                  <th style={{textAlign:"center"}}>Details</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((launch) => (
                  <tr key={launch.id}>
                    <td>
                      <Link to={`/launches/${launch.id}`}>{launch.name}</Link>
                    </td>
                    <td>{new Date(launch.date_utc).toLocaleDateString()}</td>
                    <td style={{textAlign:"center"}}><Button onClick={() => navigate(`/launches/${launch.id}`)}>See Details</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination
              mt="md"
              total={Math.ceil(filteredData.length / PAGE_SIZE)}
              value={activePage}
              onChange={setActivePage}
              position="center"
            />
          </Box>
        </>
      }
    </Container>
  )
}

export default LaunchesList
