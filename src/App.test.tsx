
import {setupServer} from 'msw/node'

import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { rest } from 'msw';

const server = setupServer(
  rest.get('https://ghibliapi.herokuapp.com/films', (req, res, ctx) => {
    return res(ctx.json([{title: 'Castle Sky',description:'The orphan Sheeta...',image:'https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg'}]))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())



test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Films from the Ghibli Studio/i);
  expect(linkElement).toBeInTheDocument();
});

test('Checks Mock API has interjected', async () => {
  render(<App />);

  await screen.findByTestId('CastleSky')

  const linkElement = screen.getByTestId('CastleSky');
  expect(linkElement).toBeInTheDocument();
});
