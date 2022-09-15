import { Input } from "../Input";
import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from "phosphor-react";

export function Form() {
  return (
    <form className="mt-8 flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      <Input
        htmlFor='game'
        label='Qual o game?'
        id='game'
        placeholder='Selecione o game que deseja jogar'
      />
    </div>

    <div className="flex flex-col gap-2">
      <Input
        htmlFor='name'
        label='Seu nome (ou nickname)'
        id='name'
        placeholder='Como te chamam dentro do game?'
      />
    </div>

    <div className='grid grid-cols-2 gap-6'>
      <div className='flex flex-col gap-2'>
        <Input
          htmlFor='yearsPlaying'
          label='Joga a quantos anos?'
          id='yearsPlaying'
          type='number'
          placeholder='Tudo bem ser ZERO'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Input
          htmlFor='discord'
          label='Qual seu Discord?'
          id='discord'
          placeholder='user#0000'
        />
      </div>
    </div>

    <div className='flex gap-6'>
      <div className='flex flex-col gap-2'>
        <label htmlFor="weekDays">Quando costuma jogar?</label>

        <div className="grid grid-cols-4 gap-2">
          <button
            className="w-8 h-8 rounded bg-zinc-900"
            title="Domingo"
          >
            D
          </button>
          <button
            className="w-8 h-8 rounded bg-zinc-900"
            title="Segunda"
          >
            S
          </button>
          <button
            className="w-8 h-8 rounded bg-zinc-900"
            title="Terça"
          >
            T
          </button>
          <button
            className="w-8 h-8 rounded bg-zinc-900"
            title="Quarta"
          >
            Q
          </button>
          <button
            className="w-8 h-8 rounded bg-zinc-900"
            title="Quinta"
          >
            Q
          </button>
          <button
            className="w-8 h-8 rounded bg-zinc-900"
              title="Sexta"
          >
            S
          </button>
          <button
            className="w-8 h-8 rounded bg-zinc-900"
              title="Sábado"
          >
            S
          </button>             

        </div>
      </div>
      <div className='flex flex-col gap-2 flex-1'>
        <label htmlFor="hourStart" className="font-semibold">Qual horário do dia?</label>
        <div className='grid grid-cols-2 gap-2'>
          <input id="hourStart" type="time" placeholder="De" className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"/>
          <input id="hourEnd" type="time" placeholder="Até" className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"/>
        </div>
      </div>
    </div>

    <div className='mt-2 flex gap-2 text-sm'>
      <input type="checkbox" />
      Costumo me conectar ao chat de voz?
    </div>

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
