
import {Component} from 'react'
import {Post} from '../postcard/post_card'
import {CustomButton} from '../buttons/custom_button'
import './posts.css'

export class Posts extends Component{

    state = {
        showedPosts: [],
        allPosts: [],
        showedPhotos: [],
        allPhotos: [],
        urlPosts: 'https://jsonplaceholder.typicode.com/posts',
        urlPhotos: 'https://jsonplaceholder.typicode.com/photos',
        page: 1, // página de posts atualmente aberta
        postsPerPage: 4,// número de posts por página aberta,
        search: '',
        matchedPosts: []
    }

    async loadPostsAndPhotos(numPostsToLoad){

        const {urlPosts, urlPhotos} = this.state

        let posts = await 
                        fetch(urlPosts)
                        .then(resp => resp.json())
                        .then(allPosts => {
                            let showedPosts = allPosts.slice(0, numPostsToLoad)
                            return {showedPosts, allPosts}
                        })

        let photos = await 
                        fetch(urlPhotos)
                        .then(resp => resp.json())
                        .then(allPhotos => {
                            let showedPhotos = allPhotos.slice(0, posts.showedPosts.length)
                            return {showedPhotos, allPhotos}
                        })

        return {...posts, ...photos}
    }

   componentDidMount = async () => { 

        let {page, postsPerPage} = this.state
        let numPostsToLoad = page * postsPerPage

        let {
            showedPosts, allPosts, showedPhotos, allPhotos
        } = await this.loadPostsAndPhotos(numPostsToLoad)

        this.setState({showedPosts, allPosts, showedPhotos, allPhotos})
    }

    loadMorePosts = async () => {
        let {page, postsPerPage, allPosts} = this.state

        let nextPage = page + 1
        let nextNumPosts = nextPage * postsPerPage

        if(nextNumPosts <= allPosts.length){

            let {showedPosts, 
                showedPhotos
            } = await this.loadPostsAndPhotos(nextNumPosts)

            this.setState({page: nextPage, showedPosts, showedPhotos})
        }
        else{
            alert('Não há mais posts para carregar!')
        }
    }

    searchPosts = (e) => {

        let {allPosts} = this.state
        let search = e.target.value.trim()
        var matchedPosts = []

        if(search){

            let searchRegex = RegExp(search, 'gim')

            matchedPosts = allPosts.filter((post) => {
                let matchedTitle = post.title.match(searchRegex)
                let matchedBody = post.body.match(searchRegex)
                return matchedTitle || matchedBody  
            })
        }
        this.setState({search, matchedPosts})
    } 

    render(){

        let {
            showedPosts, allPosts, showedPhotos, allPhotos, search, matchedPosts
        } = this.state

        // se todos os posts estão sendo exibidos
        let wereAllPostsShowed = showedPosts.length >= allPosts.length

        // determinando posts mostrados de acordo com a pesquisa
        showedPosts = search ? matchedPosts : showedPosts
        showedPhotos = search ? allPhotos : showedPhotos

        let postsList = showedPosts.map(
            (post, index) => 
            <Post key={post.id} post={post} photo={showedPhotos[index]}/>
        )
        
        return(
            <>
                <div className='posts'>
                    
                    <input className='searchPost' type='search' placeholder='Pesquise por posts'
                    onChange={this.searchPosts}></input>

                    {showedPosts.length > 0 && (postsList)}

                    {showedPosts.length <= 0 && (
                        
                        <div className='searchWarning'>
                        {`"${search}" não foi encontrado :(`}
                        </div> 
                    )}
                    
                    <CustomButton
                    hidden={search} // se houver busca
                    disabled={wereAllPostsShowed} // se for todos os posts
                    classe='btnShowMore' 
                    click={this.loadMorePosts}>Show more posts
                    </CustomButton>

                </div>
            </>
        )
    }
}
