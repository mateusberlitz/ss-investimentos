import { useToast } from '@chakra-ui/react'

interface ToastOptions {
  title: string
  description?: string
  status: 'info' | 'warning' | 'success' | 'error'
  duration?: number
  isClosable?: boolean
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export function useToasts() {
  const toast = useToast()

  const showToast = (options: ToastOptions) => {
    toast({
      title: options.title,
      description: options.description,
      status: options.status,
      duration: options.duration,
      isClosable: options.isClosable,
      position: options.position,
    })
  }

  return { showToast }
}
