interface links {
  patch: {
    small: string;
    large: string;
};
}
export interface Launch {
    id: string
    name: string
    date_utc: string
    rocket: string
    details: string
    links: links
  }
  
  export interface Rocket {
    name: string
    type: string
  }
  
  export const fetchLaunches = async (): Promise<Launch[]> => {
    const res = await fetch('https://api.spacexdata.com/v4/launches')
    return res.json()
  }
  
  export const fetchLaunchById = async (id: string): Promise<Launch> => {
    const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`)
    return res.json()
  }
  
  export const fetchRocket = async (rocketId: string): Promise<Rocket> => {
    const res = await fetch(`https://api.spacexdata.com/v4/rockets/${rocketId}`)
    return res.json()
  }
  