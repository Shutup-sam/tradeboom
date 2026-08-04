import { render, screen, fireEvent } from '@testing-library/react';
import { RiskCalculator } from '@/sections/trading-calculator/risk-calculator';
import { expect, test, describe, vi } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';

// Mock Cursor Provider so useCursor hook does not fail
vi.mock('@/components/providers/cursor-provider', () => ({
  useCursor: () => ({
    setVariant: () => {},
  }),
}));

// Mock IntersectionObserver for Framer Motion useInView / inView hooks
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

describe('RiskCalculator Component', () => {
  test('calculates correct values with default inputs', () => {
    render(<RiskCalculator />);
    
    // Default account size: 100,000; Risk: 1%
    // Default entry: 500; Stop loss: 490
    // Risk amount = 1000
    // Risk per share = 10
    // Qty = 100
    // Total value = 50,000

    expect(screen.getByText('₹1,000')).toBeInTheDocument();
    expect(screen.getByText('₹10')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('₹50,000')).toBeInTheDocument();
  });

  test('updates calculations dynamically when inputs change', () => {
    render(<RiskCalculator />);

    const accountInput = screen.getByLabelText(/Account Size/i);
    const entryInput = screen.getByLabelText(/Entry Price/i);
    const stopLossInput = screen.getByLabelText(/Stop Loss Price/i);

    fireEvent.change(accountInput, { target: { value: '200000' } });
    fireEvent.change(entryInput, { target: { value: '1000' } });
    fireEvent.change(stopLossInput, { target: { value: '950' } });

    // Account: 200,000; Risk: 1% -> Risk amount = 2,000
    // Entry: 1000; Stop loss: 950 -> Risk per share = 50
    // Qty = 2000 / 50 = 40
    // Total capital = 40 * 1000 = 40,000

    expect(screen.getByText('₹2,000')).toBeInTheDocument();
    expect(screen.getByText('₹50')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('₹40,000')).toBeInTheDocument();
  });

  test('displays warning if stop loss is higher than or equal to entry price', () => {
    render(<RiskCalculator />);

    const entryInput = screen.getByLabelText(/Entry Price/i);
    const stopLossInput = screen.getByLabelText(/Stop Loss Price/i);

    fireEvent.change(entryInput, { target: { value: '100' } });
    fireEvent.change(stopLossInput, { target: { value: '120' } });

    // Should display invalid stop loss warning alert
    expect(screen.getByText(/must be lower/i)).toBeInTheDocument();
  });
});
