import { ref } from 'vue';

import { flushPromises, mount } from '@vue/test-utils';
import {
    describe,
    expect,
    it,
    render,
    screen,
    user,
    vi,
} from '../../../../../../../tests/drivers/vitest/utils';

import ApplicantApprovalMessage from '../ApplicantApprovalMessage.vue';

import * as breakpointComposable from '../../../../../shared/composables/breakpoint';
import * as ApplicantService from '../../../../repositories/applicant-repository';
import * as ApplicantComposable from '../../../../../shared/composables/applicant';

vi.spyOn(breakpointComposable, 'useBreakpoint').mockReturnValue(ref(true));

describe('ApplicantApprovalMessage', () => {
    it('should show the request message page', async () => {
        const wrapper = mount(ApplicantApprovalMessage);

        const requestMessagepage = wrapper.find('.ApplicantApprovalMessage');
        expect(requestMessagepage.exists()).toBe(true);
    });

    it.each([
        [' ', ' ', true, 0],
        ['subject text', ' ', true, 0],
        [' ', 'textarea text', true, 0],
        ['subject text', 'textarea text', false, 1],
    ])(
        'should have the correct status of the send button',
        async (subjectText:string, textareaText:string, isDisabled: boolean, isSendingCalled) => {
            const send = vi.fn();
            const origUseApplicant = ApplicantComposable.useApplicant();
            const mockUserApplicant = vi.spyOn(ApplicantComposable, 'useApplicant').mockImplementation(() => ({
                ...origUseApplicant,
                sendApprovalMessage: send,
            }));

            render(ApplicantApprovalMessage);

            const sendButton = await screen.findByRole('button', {
                name: 'Anfrage senden',
            });

            expect(sendButton).toBeInTheDocument();

            const subjectInput = await screen.findByTestId('MessageSubject input');
            await user.type(subjectInput, subjectText);

            const textarea = await screen.findByTestId('Textarea');
            await user.type(textarea, textareaText);

            expect(sendButton.classList.contains('Disabled')).toBe(isDisabled);

            await user.click(sendButton);

            expect(send).toBeCalledTimes(isSendingCalled);

            mockUserApplicant.mockRestore();
        },
    );

    it.each([
        ['subject text', 'textarea text'],
    ])(
        'should request to send the message when the messaging object is valid',
        async (subjectText: string, textareaText:string) => {
            const mockMessageRes = vi.spyOn(ApplicantService, 'sendApprovalMessage')
                .mockImplementation(() => Promise.resolve(
                    new Response('', { status: 200 }),
                ));

            render(ApplicantApprovalMessage);

            const sendButton = await screen.findByRole('button', {
                name: 'Anfrage senden',
            });

            expect(sendButton).toBeInTheDocument();

            const subjectInput = await screen.findByTestId('MessageSubject input');
            await user.type(subjectInput, subjectText);

            const textarea = await screen.findByTestId('Textarea');
            await user.type(textarea, textareaText);

            await user.click(sendButton);
            await flushPromises();

            expect(mockMessageRes).toBeCalledTimes(1);

            const ApprovalAfterSending = await screen.findByTestId('ApprovalAfterSending');

            expect(ApprovalAfterSending).toBeInTheDocument();

            const SuccessfulIllustraion = await screen.findByTestId('SuccessfulIllustraion');

            expect(SuccessfulIllustraion).toBeInTheDocument();

            expect(SuccessfulIllustraion.textContent).toStrictEqual('Ihre Anfrage wurde versendet!'
            + 'Wir benachrichtigen Sie, sobald die Anfrage beantwortet wird.');

            mockMessageRes.mockRestore();
        },
    );

    it.each([
        ['exception', 'textarea text'],
    ])(
        'should get a page for the failed sending case, when the subject is `exception`',
        async (subjectText: string, textareaText:string) => {
            const mockMessageRes = vi.spyOn(ApplicantService, 'sendApprovalMessage')
                .mockImplementation(() => Promise.resolve(
                    new Response('', { status: 500 }),
                ));

            render(ApplicantApprovalMessage);

            const sendButton = await screen.findByRole('button', {
                name: 'Anfrage senden',
            });

            expect(sendButton).toBeInTheDocument();

            const subjectInput = await screen.findByTestId('MessageSubject input');
            await user.type(subjectInput, subjectText);

            const textarea = await screen.findByTestId('Textarea');
            await user.type(textarea, textareaText);

            await user.click(sendButton);
            await flushPromises();

            expect(mockMessageRes).toBeCalledTimes(1);

            const ApprovalAfterSending = await screen.findByTestId('ApprovalAfterSending');

            expect(ApprovalAfterSending).toBeInTheDocument();

            const FailedIllustraion = await screen.findByTestId('FailedIllustraion');

            expect(FailedIllustraion).toBeInTheDocument();

            expect(FailedIllustraion.textContent).toStrictEqual('Es tut uns leid, etwas ist schief gegangen!');

            mockMessageRes.mockRestore();
        },
    );
});
