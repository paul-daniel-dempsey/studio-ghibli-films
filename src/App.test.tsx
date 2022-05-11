
import {setupServer} from 'msw/node'

import { render, screen } from '@testing-library/react';
import App from './App';
import { rest } from 'msw';


describe("Valid Load", () => {

    const server = setupServer(
      rest.get('https://ghibliapi.herokuapp.com/films', (req, res, ctx) => {
      return res(ctx.json([{title: 'Castle1 Sky',description:'The orphan Sheeta...',image:'https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg'}]))
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
});

describe("Invalid Load : 500", () => {

  const server500 = setupServer(
    rest.get('https://ghibliapi.herokuapp.com/films', (req, res, ctx) => {
      return res( ctx.status(500,'Oops… something went wrong, try again 🤕'),
                  ctx.json([{}]))
    }),

  )

  beforeAll(() => server500.listen())
  afterEach(() => server500.resetHandlers())
  afterAll(() => server500.close())


  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Films from the Ghibli Studio/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Checks Mock API Error500 has interjected', async () => {
    render(<App />);
    const linkElement = await screen.findByText(/Oops… something went wrong, try again 🤕/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe("Invalid Load : 418", () => {

  const server418 = setupServer(
    rest.get('https://ghibliapi.herokuapp.com/films', (req, res, ctx) => {
      return res( ctx.status(418,"I'm a tea postMessage 🫖, silly"),
                  ctx.json([{}]))
    }),
  )

  beforeAll(() => server418.listen())
  afterEach(() => server418.resetHandlers())
  afterAll(() => server418.close())


  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Films from the Ghibli Studio/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Checks Mock API Error418 has interjected', async () => {
    render(<App />);
    const linkElement = await screen.findByText(/I'm a tea postMessage 🫖, silly/i);
    expect(linkElement).toBeInTheDocument();
  });
});