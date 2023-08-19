import './styles.css'

export const LoginPage = () => {

    function submitForm (e: any){
        e.preventDefault()
        console.log('enviando dados')
    }

    return (
        <div className='container'>
            <h1>MutantWhats</h1>
            <form onSubmit={submitForm}>

                <input type="text" placeholder='E-mail' />
                <input type="password" placeholder='Senha' />

                <button type='submit'>Login</button>
            </form>
        </div>
        
    )
}