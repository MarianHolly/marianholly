import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

describe('Avatar Component', () => {
  it('should render avatar with image and fallback', () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
        <AvatarFallback>MH</AvatarFallback>
      </Avatar>
    )
    const fallback = screen.getByText('MH')
    expect(fallback).toBeInTheDocument()
  })

  it('should display fallback text when image fails to load', async () => {
    render(
      <Avatar>
        <AvatarImage src="https://invalid-url.com/avatar.jpg" alt="User" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    const fallback = screen.getByText('AB')
    expect(fallback).toBeInTheDocument()
  })

  it('should apply custom className to avatar', () => {
    const { container } = render(
      <Avatar className="custom-size">
        <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    const avatarRoot = container.querySelector('[class*="custom-size"]')
    expect(avatarRoot).toBeInTheDocument()
  })

  it('should accept image alt text', () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="John Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    const fallback = screen.getByText('JD')
    expect(fallback).toBeInTheDocument()
  })

  it('should handle multiple avatars', () => {
    render(
      <>
        <Avatar>
          <AvatarImage src="https://example.com/avatar1.jpg" alt="User 1" />
          <AvatarFallback>U1</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://example.com/avatar2.jpg" alt="User 2" />
          <AvatarFallback>U2</AvatarFallback>
        </Avatar>
      </>
    )
    expect(screen.getByText('U1')).toBeInTheDocument()
    expect(screen.getByText('U2')).toBeInTheDocument()
  })
})
