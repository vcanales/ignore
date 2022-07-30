import { component$, Host, useStore, useServerMount$, useClientEffect$ } from '@builder.io/qwik';

export const App = component$(() => {
  const state = useStore({ data: [], selected: { name:'', content: ''}, searchTerm: ''})
  
  useServerMount$(async () => {
    const response = await fetch('http://localhost:3000');
    const { data } = await response.json();

    state.data = data;
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
                      console.log(item);
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