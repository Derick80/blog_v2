import { Book } from '../schemas/book-schema'
import { prisma } from './prisma.server'

export async function getAllBooks() {
  const books = await prisma.book.findMany({
    include: {
      categories: true,

      user: {
        select: {
          id: true,
          userName: true,
          email: true,
          avatarUrl: true
        }
      }
    }
  })

  return books
}

export async function getBookByBookId(id: string) {
  const book = await prisma.book.findUnique({
    where: {
      id: id
    },
    include: {
      categories: true,

      user: {
        select: {
          id: true,
          userName: true,
          email: true,
          avatarUrl: true
        }
      }
    }
  })

  return book
}

export async function getBookCategories() {
  const categories = await prisma.bookCategory.findMany({
    distinct: ['value'],
    orderBy: {
      value: 'asc'
    }
  })

  return categories
}

export async function createNewBookReview(book: Omit<Book, 'id' | 'user'>) {
  const bookreview = await prisma.book.create({
    data: {
      title: book.title,
      review: book.review,
      rating: book.rating,
      image: book.image,
      bookUrl: book.bookUrl,
      dateCompleted: new Date(book.dateCompleted),

      categories: {
        connectOrCreate: book.categories.map((category) => ({
          where: {
            value: category.value
          },
          create: {
            value: category.value,
            label: category.value
          }
        }))
      },
      user: {
        connect: {
          id: book.userId
        }
      }
    }
  })

  return bookreview
}

export async function updateBookReview(book: Omit<Book, 'user'>) {
  const bookreview = await prisma.book.update({
    where: {
      id: book.id
    },
    data: {
      title: book.title,
      review: book.review,
      rating: book.rating,
      image: book.image,
      bookUrl: book.bookUrl,
      dateCompleted: new Date(book.dateCompleted),
      categories: {
        set: book.categories.map((category) => ({
          value: category.value
        }))
      }
    }
  })

  return bookreview
}
