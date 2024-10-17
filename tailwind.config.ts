import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	screens: {
  		'500': '500px',
  		'750': '750px',
  		'1024': '1024px',
  		'1200': '1200px',
  		'1440': '1440px'
  	},
  	extend: {
  		colors: {
  			primary: {
  				'1': '#FFFFFF',
  				'2': '#363738'
  			},
  			secondary: {
  				'1': '#FEFAF1',
  				'2': '#DB4444 ',
  				DEFAULT: '#F5F5F5'
  			},
  			text: {
  				'1': '#7D8184',
  				DEFAULT: '#FAFAFA'
  			},
  			button: {
  				'1': '#00FF66',
  				hover: '#A0BCE0',
  				hover2: '#E07575'
  			},
  			neutral: {
  				'50': '#F4F4F6',
  				'100': '#E9EAEC',
  				'200': '#D1D4DB',
  				'300': '#9096A2',
  				'400': '#4D566B',
  				'500': '#202C46',
  				'600': '#1B253C'
  			},
  			blue: {
  				'100': '#F5F7FE',
  				'200': '#EAEFFD',
  				'300': '#ADBEF7',
  				'400': '#5A7DEE',
  				'500': '#315CEA',
  				'600': '#2A4EC7',
  				'700': '#2240A4'
  			},
  			purple: {
  				'100': '#F8F5FE',
  				'200': '#F1ECFC',
  				'300': '#C9B2F3',
  				'400': '#9265E8',
  				'500': '#773FE2',
  				'600': '#6436BF'
  			},
  			magenta: {
  				'100': '#FEF6F8',
  				'200': '#FCEEF1',
  				'300': '#F4BAC8',
  				'400': '#E97591',
  				'500': '#E35275',
  				'600': '#C24764'
  			},
  			green: {
  				'100': '#F4FDF7',
  				'200': '#E9FAEF',
  				'300': '#A9EBBF',
  				'400': '#52D880',
  				'500': '#27CE60',
  				'600': '#21AF52'
  			},
  			red: {
  				'100': '#FCE9EC',
  				'200': '#F9D2D9',
  				'300': '#F2A6B4',
  				'400': '#E9677F',
  				'500': '#DF2648',
  				'600': '#B71F3B'
  			},
  			yellow: {
  				'100': '#FEF3E6',
  				'200': '#FDE7CD',
  				'300': '#FCCF9C',
  				'400': '#FAB261',
  				'500': '#F89118',
  				'600': '#C77414'
  			},
  			success: {
  				'50': '#ECFDF5',
  				'100': '#D1FAE5',
  				'200': '#A7F3D0',
  				'300': '#6EE7B7',
  				'400': '#34D399',
  				'500': '#10B981',
  				'600': '#059669',
  				'700': '#047857',
  				'800': '#065F46',
  				'900': '#064E3B'
  			},
  			warning: {
  				'50': '#FFFBEB',
  				'100': '#FEF3C7',
  				'200': '#FDE68A',
  				'300': '#FCD34D',
  				'400': '#FBBF24',
  				'500': '#F59E0B',
  				'600': '#D97706',
  				'700': '#B45309',
  				'800': '#92400E',
  				'900': '#78350F'
  			},
  			error: {
  				'50': '#FFF1F2',
  				'100': '#FFE4E6',
  				'200': '#FECDD3',
  				'300': '#FDA4AF',
  				'400': '#FB7185',
  				'500': '#F43F5E',
  				'600': '#E11D48',
  				'700': '#BE123C',
  				'800': '#9F1239',
  				'900': '#881337'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'collapsible-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-collapsible-content-height)'
  				}
  			},
  			'collapsible-up': {
  				from: {
  					height: 'var(--radix-collapsible-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'collapsible-down': 'collapsible-down 0.2s ease-out',
  			'collapsible-up': 'collapsible-up 0.2s ease-out'
  		}
  	}
  },

  plugins: [],
};
export default config;
