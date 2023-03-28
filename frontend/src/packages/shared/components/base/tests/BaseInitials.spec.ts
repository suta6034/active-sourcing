import {
    expect,
    it,
    describe,
    render,
    screen,
    flushPromises,
    fireEvent,
    user,
} from '../../../../../../tests/drivers/vitest/utils';

import BaseInitials from '../BaseInitials.vue';

describe('BaseInitials', () => {
    describe.each([
        [false],
        [true],
    ])('it should render the image if it is set and not the initials', (validUrl) => {
        it(`where the given url for the image is ${validUrl ? 'valid' : 'invalid'}`, async () => {
            render(BaseInitials, {
                props: {
                    initials: 'MM',
                    img: 'http://test.url/',
                },
            });
            const image = await screen.findByTestId('BaseInitials image') as HTMLImageElement;
            expect(image.src).toStrictEqual('http://test.url/');
            if (!validUrl) {
                fireEvent.error(image);
            }
            await flushPromises();
            const imageAfterValidation = screen.queryByTestId('BaseInitials image');
            const initialsAfterValidation = screen.queryByTestId('BaseInitials initials');
            if (validUrl) {
                expect(imageAfterValidation).not.toBeNull();
                expect(initialsAfterValidation).toBeNull();
            } else {
                expect(imageAfterValidation).toBeNull();
                expect(initialsAfterValidation).not.toBeNull();
                expect(initialsAfterValidation?.textContent).toStrictEqual('MM');
            }
        });
    });
    describe.each([
        [false, false],
        [false, true],
        [true, false],
        [true, true],
    ])('it should only emit initialsClick on click if it is enabled', (clickable, small) => {
        it(`where clickable is '${clickable}' and small is '${small}'`, async () => {
            const wrapper = render(BaseInitials, {
                props: {
                    initials: 'MM',
                    clickable,
                    small,
                },
            });
            const initials = await screen.findByTestId(small ? 'BaseInitials Small' : 'BaseInitials');
            await user.click(initials);
            if (clickable) {
                expect(wrapper.emitted().initialsClick).toBeDefined();
            } else {
                expect(wrapper.emitted().initialsClick).toBeUndefined();
            }
        });
    });
});
