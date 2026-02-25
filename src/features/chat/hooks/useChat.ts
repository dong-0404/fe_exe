/**
 * useChat Hook
 * Custom hook for chat logic
 */

import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { fetchConversations, fetchMessages } from '../chatThunks'
import { setCurrentConversation } from '../chatSlice'
import { selectCurrentConversationId } from '../chatSelectors'
import { websocketService } from '../api/websocketService'

export const useChat = (initialConversationId?: string) => {
  const dispatch = useAppDispatch()
  const currentConversationId = useAppSelector(selectCurrentConversationId)
  const previousConversationIdRef = useRef<string | null>(null)

  // Fetch conversations on mount
  useEffect(() => {
    dispatch(fetchConversations())
  }, [dispatch])

  // Set initial conversation if provided
  useEffect(() => {
    if (initialConversationId) {
      dispatch(setCurrentConversation(initialConversationId))
    }
  }, [initialConversationId, dispatch])

  // Fetch messages and join/leave Socket.io room when conversation changes
  useEffect(() => {
    if (currentConversationId) {
      // Leave previous conversation room if exists
      if (previousConversationIdRef.current && previousConversationIdRef.current !== currentConversationId) {
        websocketService.leaveConversation(previousConversationIdRef.current)
      }

      // Join new conversation room
      if (websocketService.isConnected()) {
        websocketService.joinConversation(currentConversationId)
      }

      // Fetch messages
      dispatch(fetchMessages(currentConversationId))

      // Update previous conversation ID
      previousConversationIdRef.current = currentConversationId
    } else {
      // Leave conversation room if conversation is cleared
      if (previousConversationIdRef.current) {
        websocketService.leaveConversation(previousConversationIdRef.current)
        previousConversationIdRef.current = null
      }
    }

    // Cleanup: Leave room on unmount
    return () => {
      if (previousConversationIdRef.current) {
        websocketService.leaveConversation(previousConversationIdRef.current)
      }
    }
  }, [currentConversationId, dispatch])

  // Join room when WebSocket connects (if conversation is already selected)
  useEffect(() => {
    const handleConnect = () => {
      if (currentConversationId && websocketService.isConnected()) {
        websocketService.joinConversation(currentConversationId)
      }
    }

    // Check if already connected
    if (websocketService.isConnected() && currentConversationId) {
      websocketService.joinConversation(currentConversationId)
    }

    // Subscribe to connect events
    const unsubscribe = websocketService.onConnect(handleConnect)

    return unsubscribe
  }, [currentConversationId])

  return {
    currentConversationId,
  }
}
