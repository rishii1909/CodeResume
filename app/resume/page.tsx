'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { render } from '@testing-library/react';
import { cn, withProps } from '@udecode/cn';
import { BaseParagraphPlugin, createSlateEditor, Descendant, Value } from '@udecode/plate';
import {
  AIChatPlugin,
  AIChatPluginConfig,
  AIPlugin,
  AIPluginConfig,
  useChatChunk,
} from '@udecode/plate-ai/react';
import { AlignPlugin } from '@udecode/plate-alignment/react';
import { AutoformatPlugin } from '@udecode/plate-autoformat/react';
import {
  BaseBoldPlugin,
  BaseCodePlugin,
  BaseItalicPlugin,
  BaseStrikethroughPlugin,
  BaseUnderlinePlugin,
} from '@udecode/plate-basic-marks';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BaseBlockquotePlugin } from '@udecode/plate-block-quote';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import {
  BaseCodeBlockPlugin,
  BaseCodeLinePlugin,
  BaseCodeSyntaxPlugin,
} from '@udecode/plate-code-block';
import { DndPlugin } from '@udecode/plate-dnd';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontSizePlugin,
} from '@udecode/plate-font/react';
import { BaseHeadingPlugin, HEADING_KEYS, HEADING_LEVELS } from '@udecode/plate-heading';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { BaseHorizontalRulePlugin } from '@udecode/plate-horizontal-rule';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { BaseIndentListPlugin } from '@udecode/plate-indent-list';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { IndentPlugin } from '@udecode/plate-indent/react';
import { ColumnItemPlugin, ColumnPlugin } from '@udecode/plate-layout/react';
import { LineHeightPlugin } from '@udecode/plate-line-height/react';
import { BaseLinkPlugin } from '@udecode/plate-link';
import { LinkPlugin } from '@udecode/plate-link/react';
import {
  BulletedListPlugin,
  ListItemPlugin,
  ListPlugin,
  NumberedListPlugin,
} from '@udecode/plate-list/react';
import { deserializeInlineMd, MarkdownPlugin } from '@udecode/plate-markdown';
import { ImagePlugin } from '@udecode/plate-media/react';
import { NodeIdPlugin } from '@udecode/plate-node-id';
import { BlockSelectionPlugin } from '@udecode/plate-selection/react';
import { SlashInputPlugin, SlashPlugin } from '@udecode/plate-slash-command/react';
import {
  createPlatePlugin,
  ParagraphPlugin,
  Plate,
  PlateContent,
  PlateElement,
  PlateLeaf,
  useEditorContainerRef,
  useEditorPlugin,
  useEditorRef,
  usePlateEditor,
  withRef,
} from '@udecode/plate/react';
import type { PlateContentProps, PlateRenderElementProps } from '@udecode/plate/react';
import axios from 'axios';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { debounce } from 'lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Divider, List, ListItem, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FixedToolbarPlugin } from '@/components/editor/plugins/fixed-toolbar-plugin';
import { FloatingToolbarPlugin } from '@/components/editor/plugins/floating-toolbar-plugin';
import { AILeaf } from '@/components/plate-ui/ai-leaf';
import { AIMenu } from '@/components/plate-ui/ai-menu';
import { withAIBatch } from '@/components/plate-ui/ai-menu-items';
import { ColumnElement } from '@/components/plate-ui/column-element';
import { ColumnGroupElement } from '@/components/plate-ui/column-group-element';
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf';
import { HrElement } from '@/components/plate-ui/hr-element';
import { ImageElement } from '@/components/plate-ui/image-element';
import { TodoLiStatic, TodoMarkerStatic } from '@/components/plate-ui/indent-todo-marker-static';
import { LinkElement } from '@/components/plate-ui/link-element';
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar';
import { ListElement } from '@/components/plate-ui/list-element';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/plate-ui/popover';
import { SlashInputElement } from '@/components/plate-ui/slash-input-element';
import { SourceElement, SourcePlugin } from '@/components/plate-ui/source-element';

const editorContainerVariants = cva(
  'relative w-full cursor-text select-text overflow-y-auto caret-primary  focus-visible:outline-none [&_.slate-selection-area]:border [&_.slate-selection-area]:border-brand/25 [&_.slate-selection-area]:bg-brand/15',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'h-full',
        demo: 'h-[650px]',
        select: cn(
          'group rounded-md border border-input ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          'has-[[data-readonly]]:w-fit has-[[data-readonly]]:cursor-default has-[[data-readonly]]:border-transparent has-[[data-readonly]]:focus-within:[box-shadow:none]'
        ),
      },
    },
  }
);

export const EditorContainer = ({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof editorContainerVariants>) => {
  const editor = useEditorRef();
  const containerRef = useEditorContainerRef();

  return (
    <div
      id={editor.uid}
      ref={containerRef}
      className={cn(
        'ignore-click-outside/toolbar',
        editorContainerVariants({ variant }),
        className
      )}
      {...props}
    />
  );
};

EditorContainer.displayName = 'EditorContainer';

const editorVariants = cva(
  cn(
    'group/editor',
    'relative w-full cursor-text select-text overflow-x-hidden whitespace-pre-wrap break-words',
    'rounded-md ring-offset-background  focus-visible:outline-none',
    'placeholder:text-muted-foreground/80 [&_[data-slate-placeholder]]:top-[auto_!important] [&_[data-slate-placeholder]]:text-muted-foreground/80 [&_[data-slate-placeholder]]:!opacity-100',
    '[&_strong]:font-bold'
  ),
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      disabled: {
        true: 'cursor-not-allowed opacity-50',
      },
      focused: {
        true: 'ring-2 ring-ring ring-offset-2',
      },
      variant: {
        ai: 'w-full px-0 text-base md:text-sm',
        aiChat:
          'max-h-[min(70vh,320px)] w-full max-w-[700px] overflow-y-auto px-3 py-2 text-base md:text-sm',
        default: 'size-full px-16 pb-72 pt-4 text-base sm:px-[max(64px,calc(50%-350px))]',
        demo: 'size-full px-16 pb-72 pt-4 text-base sm:px-[max(64px,calc(50%-350px))]',
        fullWidth: 'size-full px-16 pb-72 pt-4 text-base sm:px-24',
        none: '',
        select: 'px-3 py-2 bg-red-200 text-base data-[readonly]:w-fit',
      },
    },
  }
);

export type EditorProps = PlateContentProps & VariantProps<typeof editorVariants>;

export const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
  ({ className, disabled, focused, variant, ...props }, ref) => {
    return (
      <PlateContent
        ref={ref}
        className={cn(
          editorVariants({
            disabled,
            focused,
            variant,
          }),
          className
        )}
        disabled={disabled}
        disableDefaultStyles
        {...props}
      />
    );
  }
);

Editor.displayName = 'Editor';

export default function BasicPluginsComponentsDemo() {
  const username = 'defunkt';

  const editor = usePlateEditor({
    override: {
      components: {
        blockquote: withProps(PlateElement, {
          as: 'blockquote',
          className: 'mb-4 border-l-4 border-[#d0d7de] pl-4 text-[#636c76]',
        }),
        bold: withProps(PlateLeaf, { as: 'strong', className: 'font-semibold' }),
        h1: withProps(PlateElement, {
          as: 'h1',
          className: 'mb-4 mt-6 text-3xl font-semibold tracking-tight lg:text-4xl',
        }),
        h2: withProps(PlateElement, {
          as: 'h2',
          className: 'mb-4 mt-6 text-2xl font-semibold tracking-tight',
        }),
        h3: withProps(PlateElement, {
          as: 'h3',
          className: 'mb-4 mt-6 text-lg font-semibold tracking-tight',
        }),
        italic: withProps(PlateLeaf, { as: 'em' }),
        p: withProps(PlateElement, {
          as: 'p',
          className: 'mb-4',
        }),
        underline: withProps(PlateLeaf, { as: 'u' }),
        column_group: ColumnGroupElement,
        column: ColumnElement,
        [HighlightPlugin.key]: HighlightLeaf,
        source: SourceElement,
        ai: AILeaf,
        [HorizontalRulePlugin.key]: HrElement,
        [SlashInputPlugin.key]: SlashInputElement,
        [LinkPlugin.key]: LinkElement,
        [BulletedListPlugin.key]: withProps(ListElement, { variant: 'ul' }),
        [ListItemPlugin.key]: withProps(PlateElement, { as: 'li' }),
        [NumberedListPlugin.key]: withProps(ListElement, { variant: 'ol' }),
        [ImagePlugin.key]: ImageElement,
      },
    },
    plugins: [
      BlockquotePlugin,
      AlignPlugin.configure({
        inject: {
          targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS],
        },
      }),
      HeadingPlugin,
      ParagraphPlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      CodePlugin,
      FixedToolbarPlugin,
      FontColorPlugin,
      FontBackgroundColorPlugin,
      FontSizePlugin,
      ColumnPlugin,
      ColumnItemPlugin,
      SourcePlugin,
      MarkdownPlugin.configure({ options: { indentList: true } }),
      HighlightPlugin,
      HorizontalRulePlugin,
      AutoformatPlugin,
      SlashPlugin,
      IndentListPlugin,

      LineHeightPlugin.configure({
        inject: {
          nodeProps: {
            defaultNodeValue: 1.5,
            validNodeValues: [1, 1.2, 1.5, 2, 3],
          },
          targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS],
        },
      }),
      LinkPlugin.configure({
        render: { afterEditable: () => <LinkFloatingToolbar /> },
      }),
      AIPlugin,
      AIChatPlugin.extend(() => ({
        useHooks: useAIChatHooks,
      })).configure({
        options: {
          aiEditor: createAIEditor(),
          open: false,

          promptTemplate: ({ isBlockSelecting, isSelecting }) => {
            return isBlockSelecting
              ? PROMPT_TEMPLATES.userBlockSelecting
              : isSelecting
                ? PROMPT_TEMPLATES.userSelecting
                : PROMPT_TEMPLATES.userDefault;
          },
          systemTemplate: ({ isBlockSelecting, isSelecting }) => {
            return isBlockSelecting
              ? PROMPT_TEMPLATES.systemBlockSelecting
              : isSelecting
                ? PROMPT_TEMPLATES.systemSelecting
                : PROMPT_TEMPLATES.systemDefault;
          },
        },
        render: { afterEditable: () => <AIMenu /> },
      }),
      NodeIdPlugin,
      DndPlugin.configure({ options: { enableScroller: true } }),
      FloatingToolbarPlugin,
      IndentPlugin.configure({
        inject: {
          targetPlugins: [ParagraphPlugin.key, HEADING_KEYS.h1],
        },
      }),
      IndentListPlugin.configure({
        inject: {
          targetPlugins: [ParagraphPlugin.key, HEADING_KEYS.h1],
        },
      }),
      BlockSelectionPlugin,
    ],
    value: [], // Initialize with current content
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.post('http://localhost:8000/resume/get', {
          username,
        });
        const { content } = response.data;

        editor.tf.setValue(content);
      } catch (error) {
        console.error('Failed to fetch content:', error);
      }
    };

    fetchContent();
  }, [username]);

  const saveResume = debounce(async () => {
    try {
      const response = await axios.post('http://localhost:8000/resume/save', {
        username,
        content: editor.children,
      });
    } catch (error) {
      console.error('Failed to save resume:', error);
    }
  }, 1000);

  return (
    <Plate editor={editor} onValueChange={saveResume}>
      <EditorContainer>
        <DndProvider backend={HTML5Backend}>
          <Editor
            placeholder={editor.children.length === 0 ? 'Loading...' : 'Type...'}
            autoFocus={false}
            spellCheck={false}
          />
        </DndProvider>
      </EditorContainer>
    </Plate>
  );
}

export const basicEditorValue = [
  {
    id: '1',
    children: [
      {
        text: '{fullName}',
      },
    ],
    align: 'center',
    type: 'p',
  },

  // {
  //   id: '1.5',
  //   children: [
  //     // {
  //     //   text: 'source text here',
  //     // },
  //   ],
  //   sources: ['Source 1', 'Source 2'],
  //   align: 'center',
  //   type: 'source',
  // },
  {
    id: '2',
    children: [
      {
        text: 'Cambridge, MA 02318 • jsmith@college.harvard.edu • 617-495-2595 • https://github.com/jsmith24',
      },
    ],
    align: 'center',
    type: 'p',
  },
  {
    id: '4',
    children: [
      {
        text: 'HARVARD UNIVERSITY Cambridge, MA',
      },
      {
        text: '\nAB in Computer Science, GPA: 3.55/4.0 May 2025',
      },
      {
        text: '\nRelevant Coursework: Systems Programming, Data Structures and Algorithms, Artificial Intelligence, Introduction to Probability, Multivariable Calculus',
      },
      {
        text: '\nCommit 20 hours per week to the Harvard Varsity Lacrosse Program.',
      },
    ],
    type: 'p',
  },
  {
    id: '5',
    children: [
      {
        text: 'IRVINE HIGH SCHOOL Irvine, CA',
      },
      {
        text: '\nHigh School Diploma, SAT I: M:780 V:760 June 2021',
      },
      {
        text: '\nNational Merit Scholar Finalist. Member of Varsity Lacrosse Team.',
      },
    ],
    type: 'p',
  },
  {
    id: '6',
    children: [
      {
        text: 'Technical Skills & Projects',
      },
    ],
    type: 'h2',
  },
  {
    id: '7',
    children: [
      {
        text: 'Programming: C, C++, C#, SQL, Python, MATLAB, JavaScript, OCaml.',
      },
      {
        text: '\nDesign: Wix, Adobe XD, Figma',
      },
    ],
    type: 'p',
  },
  {
    id: '8',
    children: [
      {
        text: 'CS 145 Final Project',
      },
    ],
    type: 'h3',
  },
  {
    id: '9',
    children: [
      {
        text: 'Implemented a basic rule-based firewall for programmable network switches using the P4 programming domain-specific language. Allows user to block network traffic based on 5-tuple, including variable-length ranges of IP addresses.',
      },
    ],
    type: 'p',
  },
  {
    id: '10',
    children: [
      {
        text: 'CS 50 Final Project',
      },
    ],
    type: 'h3',
  },
  {
    id: '11',
    children: [
      {
        text: 'Created a Google Chrome extension that allows users to replace the images on websites they visit with pictures of animals. Implemented using a combination of HTML, CSS, and JavaScript.',
      },
    ],
    type: 'p',
  },
  {
    id: '12',
    children: [
      {
        text: 'Relevant Experience',
      },
    ],
    type: 'h2',
  },
  {
    id: '13',
    children: [
      {
        text: 'MICROSOFT Software Engineering Intern',
      },
      {
        text: '\nNew York, NY June - August 2023',
      },
      {
        text: '\nDesigned and implemented a productivity add-on for Office using C# and VSTO in .NET framework to automate and synchronize activity reporting. Created testing and demonstration suites for software.',
      },
    ],
    type: 'p',
  },
  {
    id: '14',
    children: [
      {
        text: 'HARVARD UNIVERSITY Teaching Fellow, Introduction to Computer Science',
      },
      {
        text: '\nCambridge, MA September 2021 – May 2022',
      },
      {
        text: '\nTaught class of 21 students to program in C, PHP, JavaScript, and object-oriented concepts. Maintained weekly office hours and problem-solving sessions. Graded problem sets and exams.',
      },
    ],
    type: 'p',
  },
  {
    id: '15',
    children: [
      {
        text: 'TECH HILLS Technology Intern',
      },
      {
        text: '\nLaguna Hills, CA June - August 2021',
      },
      {
        text: '\nImplemented new web site including back-end database storage system and dynamic web pages. Developed and conducted usability tests, implementing enhancements to improve user experience.',
      },
    ],
    type: 'p',
  },
  {
    id: '16',
    children: [
      {
        text: 'Leadership',
      },
    ],
    type: 'h2',
  },
  {
    id: '17',
    children: [
      {
        text: 'HARVARD COMPUTER SOCIETY Membership Coordinator / Board Member',
      },
      {
        text: '\nCambridge, MA January 2022 - Present',
      },
      {
        text: '\nOrganized marketing and advertising campaign, resulting in a 20% increase in membership. Coordinated tech conference for thirty professionals and 75 students. Upgraded and enhanced website using Wix.',
      },
    ],
    type: 'p',
  },
  {
    id: '18',
    children: [
      {
        text: 'HARVARD COLLEGE MARATHON CHALLENGE Training Program Director',
      },
      {
        text: '\nCambridge, MA January - May 2021',
      },
      {
        text: '\nDeveloped training program for 25 charity runners. Raised over $25,000 to support Phillips Brooks House.',
      },
    ],
    type: 'p',
  },
];

const systemCommon = `\
You are an advanced AI-powered resume-writing assistant, designed to enhance accuracy, format, grammars, so on in resumes.
Respond directly to user prompts with clear, concise, and relevant content. Maintain a neutral, helpful tone. STRICTLY respond with factual data
 
Rules:
- <Document> is the entire note the user is working on.
- <Reminder> is a reminder of how you should reply to INSTRUCTIONS. It does not apply to questions.
- Anything else is the user prompt.
- Your response should be tailored to the user's prompt, providing precise assistance to optimize note management.
- For INSTRUCTIONS: Follow the <Reminder> exactly. Provide ONLY the content to be inserted or replaced. No explanations or comments or conversations. When returning data from retrieval, make sure to make the text more professional and concise.
`;

const systemDefault = `\
${systemCommon}
- <Block> is the current block of text the user is working on.
- Ensure your output can seamlessly fit into the existing <Block> structure.
- CRITICAL: Provide only a single block of text. DO NOT create multiple paragraphs or separate blocks.
<Block>
{block}
</Block>
`;

const systemSelecting = `\
${systemCommon}
- <Block> is the block of text containing the user's selection, providing context.
- Ensure your output can seamlessly fit into the existing <Block> structure.
- <Selection> is the specific text the user has selected in the block and wants to modify or ask about.
- Consider the context provided by <Block>, but only modify <Selection>. Your response should be a direct replacement for <Selection>.
<Block>
{block}
</Block>
<Selection>
{selection}
</Selection>
`;

const systemBlockSelecting = `\
${systemCommon}
- <Selection> represents the full blocks of text the user has selected and wants to modify or ask about.
- Your response should be a direct replacement for the entire <Selection>.
- Maintain the overall structure and formatting of the selected blocks, unless explicitly instructed otherwise.
- CRITICAL: Provide only the content to replace <Selection>. Do not add additional blocks or change the block structure unless specifically requested.
<Selection>
{block}
</Selection>
`;

const userDefault = `<Reminder>
CRITICAL: DO NOT use block formatting. You can only use inline formatting.
CRITICAL: DO NOT start new lines or paragraphs.
NEVER write <Block>.
</Reminder>
{prompt}`;

const userSelecting = `<Reminder>
If this is a question, provide a helpful and concise answer about <Selection>.
If this is an instruction, provide ONLY the text to replace <Selection>. No explanations.
Ensure it fits seamlessly within <Block>. If <Block> is empty, write ONE random sentence.
NEVER write <Block> or <Selection>.
</Reminder>
{prompt} about <Selection>`;

const userBlockSelecting = `<Reminder>
If this is a question, provide a helpful and concise answer about <Selection>.
If this is an instruction, provide ONLY the content to replace the entire <Selection>. No explanations.
Maintain the overall structure unless instructed otherwise.
NEVER write <Block> or <Selection>.
</Reminder>
{prompt} about <Selection>`;

export const PROMPT_TEMPLATES = {
  systemBlockSelecting,
  systemDefault,
  systemSelecting,
  userBlockSelecting,
  userDefault,
  userSelecting,
};
export const createAIEditor = () => {
  const editor = createSlateEditor({
    id: 'ai',
    plugins: [
      BaseBlockquotePlugin,
      BaseBoldPlugin,
      BaseCodeBlockPlugin,
      BaseCodeLinePlugin,
      BaseCodePlugin,
      BaseCodeSyntaxPlugin,
      BaseItalicPlugin,
      BaseStrikethroughPlugin,
      BaseUnderlinePlugin,
      BaseHeadingPlugin,
      BaseHorizontalRulePlugin,
      BaseLinkPlugin,
      BaseParagraphPlugin,
      BaseIndentListPlugin.extend({
        inject: {
          targetPlugins: [
            BaseParagraphPlugin.key,
            ...HEADING_LEVELS,
            BaseBlockquotePlugin.key,
            BaseCodeBlockPlugin.key,
          ],
        },
        options: {
          listStyleTypes: {
            todo: {
              liComponent: TodoLiStatic,
              markerComponent: TodoMarkerStatic,
              type: 'todo',
            },
          },
        },
      }),
      MarkdownPlugin.configure({ options: { indentList: true } }),
      ListPlugin,
    ],
  });

  return editor;
};
type SourceElement = PlateRenderElementProps['element'] & {
  type: 'source';
  sources: string[];
};

// Define the props for the SourceComponent, using the custom SourceElement
interface SourceComponentProps extends PlateRenderElementProps {
  element: SourceElement;
}

export const useAIChatHooks = () => {
  const { editor, tf } = useEditorPlugin<AIPluginConfig>({ key: 'ai' });
  const { useOption } = useEditorPlugin<AIChatPluginConfig>({ key: 'aiChat' });
  const mode = useOption('mode');

  useChatChunk({
    onChunk: ({ isFirst, nodes }) => {
      if (mode === 'insert' && nodes.length > 0) {
        withAIBatch(
          editor,
          () => {
            tf.ai.insertNodes(nodes);
          },
          { split: isFirst }
        );
      }
    },
    onFinish: ({ content: finishedContent }) => {
      const { id, timestamp, content, actor, sources } = JSON.parse(finishedContent);
      if (mode !== 'insert') return;

      const blockAbove = editor.api.block();

      if (!blockAbove) return;

      editor.undo();
      editor.history.redos.pop();

      withAIBatch(
        editor,
        () => {
          tf.ai.insertNodes([
            {
              children: [{ text: content }],
              type: 'source',
              id,
              timestamp,
              content,
              actor,
              sources,
            },
            { children: [{ text: '' }], type: 'p' },
          ]);
        },
        { split: true }
      );
    },
  });
};
