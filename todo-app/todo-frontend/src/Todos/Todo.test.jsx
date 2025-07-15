import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import Todo from './Todo'

describe('Todo component', () => {
  const mockTodo = { text: 'Test todo', done: false }
  const mockDelete = vi.fn()
  const mockComplete = vi.fn()

  test('renders todo text', () => {
    render(<Todo todo={mockTodo} deleteTodo={mockDelete} completeTodo={mockComplete} />)
    expect(screen.getByText('Test todo')).toBeDefined()
  })

  test('shows correct buttons for incomplete todo', () => {
    render(<Todo todo={mockTodo} deleteTodo={mockDelete} completeTodo={mockComplete} />)
    expect(screen.getByText('Delete')).toBeDefined()
    expect(screen.getByText('Set as done')).toBeDefined()
  })

  test('calls deleteTodo when Delete is clicked', () => {
    render(<Todo todo={mockTodo} deleteTodo={mockDelete} completeTodo={mockComplete} />)
    fireEvent.click(screen.getByText('Delete'))
    expect(mockDelete).toHaveBeenCalledWith(mockTodo)
  })

  test('calls completeTodo when Set as done is clicked', () => {
    render(<Todo todo={mockTodo} deleteTodo={mockDelete} completeTodo={mockComplete} />)
    fireEvent.click(screen.getByText('Set as done'))
    expect(mockComplete).toHaveBeenCalledWith(mockTodo)
  })
})
