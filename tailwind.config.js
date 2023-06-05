/** @type {import('tailwindcss').Config} */


const graphStyle = {
  agent: '#930D0D',
  agentBg: '#930D0DC4',
  state: '#4E0D93',
  stateBg: '#4E0D93C4',

}


export default {
  content: ["./src/**/*.{html,js,jsx}",
    "index.html"],
  theme: {
    extend: {
      colors: {
        agent: graphStyle.agent,
        agentBg: graphStyle.agentBg,
        state: graphStyle.state,
        stateBg: graphStyle.stateBg
        // agent: '#930D0D',
        // agentBg: '#930D0DC4',
        // state: '#0D930D',
        // agentBg: '#930D0DB2',
        // response: '#0D1693',
        // agentBg: '#930D0DB2',
      },

    },
  },
  plugins: [],
}

