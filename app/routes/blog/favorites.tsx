import { Container, Group } from '@mantine/core'
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Dropdown from '~/components/shared/blog-ui/dropdown'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import type { Favorite } from '~/utils/schemas/favorite.schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getFavoriteList } from '~/utils/server/favorite.server'


export async function loader({ request, params }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user)
    return json({
      error: 'Not authenticated'
    })

  const favorites = await getFavoriteList(user.id)

  return json({ favorites })
}

export default function FavoritePosts() {
  const data = useLoaderData<{ favorites: Favorite[] }>()

  return (
    <Container>
      <Group position='center'>
        <h1>Favorite Posts</h1>
        <Dropdown />
      </Group>
      {data.favorites.map((favorite) => (
        <PostCard
          key={favorite.post.id}
          data={favorite.post}
          user={favorite.post.user}
          showLikes={true}
          showCategories={true}
          showComments={true}
          showFavorites={true}
          showOptions={true}
          showShare={true}
        />
      ))}
    </Container>
  )
}
