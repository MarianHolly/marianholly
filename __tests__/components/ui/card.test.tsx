import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

describe('Card Component', () => {
  it('should render card container', () => {
    const { container } = render(
      <Card>
        <div>Content</div>
      </Card>
    )
    expect(container.querySelector('[class*="rounded"]')).toBeInTheDocument()
  })

  it('should render complete card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          Main content
        </CardContent>
        <CardFooter>
          Footer content
        </CardFooter>
      </Card>
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card description')).toBeInTheDocument()
    expect(screen.getByText('Main content')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('should render card with only header', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title Only</CardTitle>
        </CardHeader>
      </Card>
    )
    expect(screen.getByText('Title Only')).toBeInTheDocument()
  })

  it('should render card with only content', () => {
    render(
      <Card>
        <CardContent>
          Content only
        </CardContent>
      </Card>
    )
    expect(screen.getByText('Content only')).toBeInTheDocument()
  })

  it('should apply custom className to card', () => {
    const { container } = render(
      <Card className="custom-card">
        <div>Custom card</div>
      </Card>
    )
    const card = container.querySelector('.custom-card')
    expect(card).toBeInTheDocument()
  })

  it('should support complex nested content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Project</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Project description</p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
          </ul>
        </CardContent>
        <CardFooter>
          <button>Learn More</button>
        </CardFooter>
      </Card>
    )

    expect(screen.getByText('Project')).toBeInTheDocument()
    expect(screen.getByText('Project description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument()
  })

  it('should render card header with title only', () => {
    render(
      <CardHeader>
        <CardTitle>Just Title</CardTitle>
      </CardHeader>
    )
    expect(screen.getByText('Just Title')).toBeInTheDocument()
  })

  it('should render card with multiple sections', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Section 1</CardTitle>
        </CardHeader>
        <CardContent>Content 1</CardContent>
        <CardHeader>
          <CardTitle>Section 2</CardTitle>
        </CardHeader>
        <CardContent>Content 2</CardContent>
      </Card>
    )

    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
  })
})
