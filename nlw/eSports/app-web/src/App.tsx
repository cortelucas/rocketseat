import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner/index'
import { GameController } from 'phosphor-react'

import './styles/main.css'
import logo from '../public/assets/logo.svg'
import { Input } from './components/Form/Input'
import { Form } from './components/Form/Form'
import { Modal } from './components/Modal'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

export default function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>
    
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(({id, _count, bannerUrl, title}: Game, index) => {
          return (
            <GameBanner
              key={id}
              bannerUrl={bannerUrl}
              title={title}
              adsCount={_count.ads}
            />
          )
        })}
      </div>

      <Modal />
    </div>
  )
}
