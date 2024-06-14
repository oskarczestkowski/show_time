import dynamic from 'next/dynamic'
 
const MapElement = dynamic(() => import('./MapElement'), { ssr: true })
export const Map = ()=>{
    return(
        <MapElement />
    )
}