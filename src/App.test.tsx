
import {setupServer} from 'msw/node'

import { render, screen } from '@testing-library/react';
import App from './App';
import { rest } from 'msw';

const server = setupServer(
  rest.get('https://ghibliapi.herokuapp.com/films', (req, res, ctx) => {
  return res(ctx.json([{title: 'Castle1 Sky',description:'The orphan Sheeta...',image:'https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg'}]))
  }),
  rest.get('https://ghibliapi.herokuapp.com/err500', (req, res, ctx) => {
    return res( ctx.status(500,'Oops… something went wrong, try again 🤕'),
                ctx.json([{}]))
  }),
  rest.get('https://ghibliapi.herokuapp.com/err418', (req, res, ctx) => {
    return res( ctx.status(418,"I'm a tea postMessage 🫖, silly"),
                ctx.json([{}]))
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

  await screen.findByTestId('Castle1Sky')

  const linkElement = screen.getByTestId('Castle1Sky');
  expect(linkElement).toBeInTheDocument();
});

test('Checks Mock API Error500 has interjected', async () => {
  render(<App />);

  await screen.findByTestId('500')

  const linkElement = screen.getByTestId('500');
  expect(linkElement).toBeInTheDocument();
});

test('Checks Mock API Error418 has interjected', async () => {
  render(<App />);

  await screen.findByTestId('418')

  const linkElement = screen.getByTestId('418');
  expect(linkElement).toBeInTheDocument();
});