import { FormEvent, useEffect, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Indicator, Root } from "@radix-ui/react-checkbox";
import { Check, GameController } from "phosphor-react";

import { Input } from "../Input";
import { Game } from "../../../App";

import axios from 'axios'

export function Form() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  const numberWeekDays = ["0", "1", "2", "3", "4", "5", "6"]

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(({ data }) => setGames(data))
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()  
    
    const formData = new FormData(event.target as HTMLFormElement)
    const { game, name, yearsPlaying, discord, hourStart, hourEnd } = Object.fromEntries(formData)

    if (!name) {
      return
    }

    try {
      axios.post(`http://localhost:3333/games/${game}/ads`, {
        name,
        yearsPlaying: Number(yearsPlaying),
        discord,
        weekDays: weekDays.map(Number),
        hourStart,
        hourEnd,
        useVoiceChannel
      })
      
      alert('Sucesso ao criar o anúncio!')
    } catch (error) {
      console.log(error)
      alert('Erro ao criar o anúncio!')
    }

  }

  return (
    <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="game">Qual o game?</label>
        <select
          id="game"
          name="game"
          className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
          defaultValue=""
        >
          <option disabled value="">Selecione o game que deseja jogar</option>

          {games.map(({ id, title }:Game) => {
            return <option key={id} value={id}>{title}</option>
          })}
        </select>
    </div>

    <div className="flex flex-col gap-2">
      <Input
        htmlFor='name'
        label='Seu nome (ou nickname)'
        id="name"
        name="name"
        placeholder='Como te chamam dentro do game?'
      />
    </div>

    <div className='grid grid-cols-2 gap-6'>
      <div className='flex flex-col gap-2'>
        <Input
          htmlFor='yearsPlaying'
          label='Joga a quantos anos?'
          id="yearsPlaying"
          name="yearsPlaying"
          type='number'
          placeholder='Tudo bem ser ZERO'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Input
          htmlFor='discord'
          label='Qual seu Discord?'
          id="discord"
          name="discord"
          placeholder='user#0000'
        />
      </div>
    </div>

    <div className='flex gap-6'>
      <div className='flex flex-col gap-2'>
        <label htmlFor="weekDays">Quando costuma jogar?</label>
          
          <ToggleGroup.Root
            type="multiple"
            className="grid grid-cols-4 gap-2"
            value={weekDays}
            onValueChange={setWeekDays}
          > 
            <ToggleGroup.Item
              value="0"
              className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              title="Domingo"
            >
              D
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="1"                
              className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              title="Segunda"
            >
              S
            </ToggleGroup.Item>
              <ToggleGroup.Item
                value="2"                
                className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                title="Terça"
            >
              T
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="3"
              className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              title="Quarta"
            >
              Q
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="4"                
              className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              title="Quinta"
            >
              Q
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="5"                
              className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              title="Sexta"
            >
              S
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="6"                
              className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              title="Sábado"
            >
              S
            </ToggleGroup.Item>             
          </ToggleGroup.Root> 
        
      </div>
      <div className='flex flex-col gap-2 flex-1'>
        <label htmlFor="hourStart" className="font-semibold">Qual horário do dia?</label>
        <div className='grid grid-cols-2 gap-2'>
          <input name="hourStart" id="hourStart" type="time" placeholder="De" className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"/>
          <input name="hourEnd" id="hourEnd" type="time" placeholder="Até" className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"/>
        </div>
      </div>
    </div>

    <label className='mt-2 flex items-center gap-2 text-sm'>
        <Root
          className="w-6 h-6 p-1 rounded bg-zinc-900"
          checked={useVoiceChannel}
          onCheckedChange={(checked) => {
            if (checked === true) {
              setUseVoiceChannel(true)
            } else {
              setUseVoiceChannel(false)
            }
          }}
        >
          <Indicator>
            <Check className="w-4 h-4 text-emerald-400" />
        </Indicator>
      </Root>
      Costumo me conectar ao chat de voz?
    </label>

    <footer className="mt-4 flex justify-end gap-4">
      <Dialog.Close
        type="button"
        className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
      >
        Cancelar
      </Dialog.Close>
      <button
        type="submit"
        className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
      >
        <GameController className="w-6 h-6"/>
        Encontrar
      </button>
    </footer>
  </form>
  )
}
