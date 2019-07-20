import styled from "@emotion/styled"
import React from "react"
import { FakeFile } from "../editor/backup/Backup"
import { id } from "../uid"
import Attachment from "./attachment/Attachment"
import Markup from "./markup/Markup"
import { MarkupContainer } from "./markup/styles"
import { Message } from "./Message"
import MessageHeader from "./MessageHeader"
import RichEmbed from "./RichEmbed"

const ScrollContainer = styled.div`
  overflow-y: scroll;
`

const Container = styled.div`
  margin: ${({ theme }) =>
    theme.display === "cozy" ? "0 0 0 80px" : "0 0 0 9ch"};
  padding: ${({ theme }) =>
    theme.display === "cozy" ? "20px 10px 20px 0" : "10px"};

  font-size: 15px;
  line-height: 1.3;

  & > * + * {
    margin-left: ${({ theme }) => (theme.display === "cozy" ? "0" : "6px")};
  }

  & > ${MarkupContainer} {
    display: inline;
    margin-left: ${({ theme }) => (theme.display === "cozy" ? "0" : "4px")};
  }
`

type Props = {
  message: Message
  files: FileList | FakeFile[]
}

export default function MessagePreview(props: Props) {
  const { message, files } = props
  const { content, embeds, username, avatarUrl } = message

  return (
    <ScrollContainer>
      <Container>
        <MessageHeader username={username} avatarUrl={avatarUrl} />
        {content && <Markup content={content} jumboable />}
        {embeds &&
          Array.from(embeds).map(embed => (
            <RichEmbed embed={embed} key={embed[id]} />
          ))}
        {files &&
          Array.from(files).map(file => (
            <Attachment file={file} key={file.name} />
          ))}
      </Container>
    </ScrollContainer>
  )
}
