"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

function generateRoomCode(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = ""

  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }

  return code
}

export default function GameForm() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [roomCode, setRoomCode] = useState("")

  // =====================
  // CRIAR SALA
  // =====================
  function hostRoom() {
    if (!name) return

    const code = generateRoomCode()

    router.push(`/room/${code}?name=${name}&host=true`)
  }

  // =====================
  // ENTRAR NA SALA
  // =====================
  function joinRoom() {
    if (!name || !roomCode) return

    router.push(`/room/${roomCode}?name=${name}`)
  }

  return (
    <CardContent>
      <FieldGroup>

        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input
            id="name"
            placeholder="João da Silva"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <Field>
          <Button type="button" onClick={hostRoom}>
            Hospedar Sala
          </Button>
        </Field>

        <Field>
          <FieldLabel htmlFor="room">
            Código de Sala
          </FieldLabel>

          <Input
            id="room"
            placeholder="Ex: WALTZ7"
            value={roomCode}
            onChange={(e) =>
              setRoomCode(e.target.value.toUpperCase())
            }
          />
        </Field>

        <Field>
          <Button type="button" onClick={joinRoom}>
            Entrar na Sala
          </Button>

          <FieldDescription className="text-center">
            Insira um código para entrar em uma sessão existente.
          </FieldDescription>
        </Field>

      </FieldGroup>
    </CardContent>
  )
}