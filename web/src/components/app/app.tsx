import fetch from 'isomorphic-unfetch';
import { component$, Host, useStore, useServerMount$ } from '@builder.io/qwik';

export const App = component$(() => {
  const state = useStore({ data: [], selected: { name:'', content: ''}, searchTerm: ''})
  
  useServerMount$(async () => {
    try {
      const response = await fetch('http://localhost:3000');

      if (response.ok) {
        const { data } = await response.json();
        state.data = data;
      }
    } catch (e) {
      // console.error(e);
    }
  });

  return (
    <Host>
      <h1>.gitignore</h1>
      <div class="search-box">
        <div class="search-input">
          <input
            name="search_term"
            onInput$={(event) => {            
              state.searchTerm = event.target.value;
            }}
            value={state.searchTerm}
            placeholder="Search for a .gitignore template"
          />
        </div>
        { state.searchTerm && (
          <div class="search-results">
            <ul>
              {state.data.filter((item) => item.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ).map((item) => (
                <li>
                  <button
                    onClick$={() => {
                      state.selected = item;
                      state.searchTerm = '';
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {state.selected.name && <h3>{state.selected.name}</h3>}

      {state.selected.content && (
        <section class="gitignore-container">
          <button class="copy-to-clipboard" onClick$={() => navigator.clipboard.writeText(state.selected.content)}>
            📋
          </button>
          <pre class="gitignore-content">{state.selected.content}</pre>
        </section>
      )}
    </Host>
  );
});