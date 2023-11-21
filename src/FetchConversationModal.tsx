import React, { useState } from 'react';
import axios from 'axios';
import { scaleLinear } from 'd3-scale';
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  ModalFooter,
} from '@chakra-ui/react';
import TopicGraph from './TopicGraph/TopicGraph';

type FetchConversationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onFetchConversation: (conversation: { formattedText: string; plainText: string; json: any }) => void;
};

function FetchConversationModal({
  isOpen,
  onClose,
  onFetchConversation,
}: FetchConversationModalProps) {
  const [minToxicity, setMinToxicity] = useState(0);
  const [minMessages, setMinMessages] = useState(0);
  const [hasPersonalAttack, setHasPersonalAttack] = useState(false);

  const colorScale = scaleLinear<string>()
    .domain([0, 1])
    .range(['aqua', 'magenta']);

  const formatConversation = (conversationData: any[]) => {
    return conversationData.map(msg => {
      const toxicColor = colorScale(msg["meta.toxicity"]);
      const attackStyle = msg["meta.comment_has_personal_attack"] ? 'font-weight: bold;' : '';
      return `<p><span style="color: ${toxicColor}; ${attackStyle}"><b>${msg.speaker}:</b> ${msg.text}</span></p>`;
    }).join('');
  };

  const fetchConversation = async () => {
    // Your logic to fetch the conversation
    // Placeholder logic for demonstration
    const dummyData = [{ speaker: 'User1', text: 'Hello' }, { speaker: 'User2', text: 'Hi there!' }];
    const formattedData = formatConversation(dummyData);
    onFetchConversation({ formattedText: formattedData, plainText: formattedData, json: dummyData });
  };

  // Custom Vision UI Styles with full width and height
  const visionUIStyles = {
    modalContent: {
      backgroundColor: '#333', // Dark background
      color: 'white', // Light text color
      width: '100vw', // Full viewport width
      height: '100vh', // Full viewport height
      margin: 0, // Remove margin
      borderRadius: 0, // Remove border radius for full screen
      maxW: '100vw', // Ensure max width is 100% of viewport
      maxH: '100vh', // Ensure max height is 100% of viewport
    },
    header: {
      borderBottom: '1px solid #444', // Subtle separation
      paddingBottom: '0.5rem',
    },
    footer: {
      borderTop: '1px solid #444',
      paddingTop: '0.5rem',
    },
    // ... other styles ...
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent sx={visionUIStyles.modalContent}>
        <ModalHeader sx={visionUIStyles.header}>Fetch Conversation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Text fontSize="md">
              This tool fetches conversations from the Conversations Gone Awry (CGA) corpus, 
              a dataset used to study how online interactions can escalate into toxic or harmful exchanges.
            </Text>
            <TopicGraph />
          </VStack>
        </ModalBody>
        <ModalFooter sx={visionUIStyles.footer}>
          <Button colorScheme="blue" onClick={fetchConversation}>
            Fetch
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default FetchConversationModal;
