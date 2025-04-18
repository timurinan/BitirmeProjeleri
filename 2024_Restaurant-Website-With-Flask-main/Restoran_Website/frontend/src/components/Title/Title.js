import React from 'react'

export default function Title({ title, fontSize, margin }) {
  return <h1 style={{ fontSize, margin, color: '#B6BBC4' }}>{title}</h1>;
}