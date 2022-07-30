import { component$, Host, useStore, useServerMount$ } from '@builder.io/qwik';

export const App = component$(() => {
  const state = useStore({ data: [], selected: { name:'', content: ''}})
  
  useServerMount$(async () => {
    const response = await fetch('http://localhost:3000');
    const { data } = await response.json();

    state.data = data;
  });

  return (
    <Host>
      <h1>.gitignore</h1>
      <select
        preventdefault:click
        onChange$={(event) => {
          state.selected = {
            name: event.target.value,
            content: state.data.find((item) => item.name === event.target.value).content,
          }
          console.log(event.target.value)
        }}
      >
        {state.data.map((item) => {
          return <option value={item.name}>{item.name}</option>;
        })}
      </select>
      <pre class="gitignore-content">{state.selected.content}</pre>
    </Host>
  );
});
