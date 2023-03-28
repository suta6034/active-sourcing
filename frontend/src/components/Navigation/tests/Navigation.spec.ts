import { flushPromises, mount } from '@vue/test-utils';
import { ref } from 'vue';
import {
    beforeEach, afterEach,
    expect, describe, it, render, screen, user, vi, type SpyInstance,
} from '../../../../tests/drivers/vitest/utils';

import * as UserInfoService from '../../../packages/shared/composables/user-info';
import type { UserInfo } from '../../../packages/shared/types/applicant/types';
import * as breakpointComposable from '../../../packages/shared/composables/breakpoint';

import NavigationDrawer from '../NavigationDrawer.vue';
import NavRightColumnItem from '../NavigationRightColumn/NavRightColumnItem.vue';
import { isNavColumnExtended } from '../../../packages/shared/navigation/Navigation';

const mockUserInfoData: UserInfo = {
    customerType: 'Unternehmen',
    firstName: 'Max',
    lastName: 'Mustermann',
    initials: 'MM',
    profilePictureUrl: null,
    company: {
        id: 1,
        name: 'Test Company',
        address: 'Test Address 1, 4020 Linz',
    },
};

let mockGetUserInfo: SpyInstance<[], Promise<UserInfo | null>> | null = null;

describe('NavigationDrawer', () => {
    beforeEach(() => {
        isNavColumnExtended.value = false;
        mockGetUserInfo = vi.spyOn(UserInfoService, 'getUserInfo')
            .mockImplementation(() => Promise.resolve(mockUserInfoData));
    });
    afterEach(() => {
        if (mockGetUserInfo) {
            mockGetUserInfo.mockRestore();
        }
        UserInfoService.userInfo.value = null;
    });
    it('should render NavigationDrawer', async () => {
        render(NavigationDrawer);
        await screen.findByTestId('NavigationDrawer');
    });

    it('should render NavRightColumnItem', async () => {
        render(NavRightColumnItem);
        await screen.findByTestId('NavRightColumnItem');
    });

    it('should collapse nav column when backdrop is not activated - watch()', async () => {
        const wrapper = mount(NavigationDrawer, {
            props: {
                showBackdrop: true,
            },
        });
        isNavColumnExtended.value = true;

        wrapper.setProps({ showBackdrop: false });
        await flushPromises();

        expect(isNavColumnExtended.value).toBe(false);
    });

    it('should collapse nav column when backdrop is not activated', async () => {
        const wrapper = mount(NavigationDrawer, {
            props: {
                showBackdrop: false,
            },
        });
        const NavRightColumn = wrapper.find('.NavRightColumn');
        expect(NavRightColumn.exists()).toBe(true);

        Object.defineProperty(window, 'innerWidth', {
            value: 1600,
        });

        window.dispatchEvent(new Event('resize'));
        await flushPromises();

        expect(window.innerWidth).toBe(1600);
        expect(NavRightColumn.element.classList.contains('w-[80px]')).toBe(true);
    });

    it('should extend certain nav item when clicking nav item when nav column is collapsed', async () => {
        render(NavigationDrawer);
        await screen.findByTestId('NavRightColumnNavItem-1');

        const NavRightColumnNavItem1 = await screen.findByTestId('NavRightColumnNavItem-1');
        await user.click(NavRightColumnNavItem1);

        const NavRightColumn = await screen.findByTestId('NavRightColumn');

        await screen.findByTestId('NavRightColumn');

        expect(NavRightColumn.classList.contains('w-[272px]')).toBe(true);

        await user.click(NavRightColumnNavItem1);
        expect(NavRightColumn.classList.contains('w-[80px]')).toBe(true);
    });

    it('should show x button when nav item is extended', async () => {
        render(NavigationDrawer);

        await user.click(await screen.findByTestId('NavRightColumnNavItem-1'));

        await screen.findByTestId('NavXButton');
    });
    describe.each([
        [true],
        [false],
    ])('it should close nav column when clicking x button', (isBetweenMDAndFourXL) => {
        it(`where isBetweenMDAndFourXL is '${isBetweenMDAndFourXL}'`, async () => {
            const mockUseBreakPoint = vi.spyOn(breakpointComposable, 'useBreakpoint')
                .mockImplementation((bp: string, mode?: 'min' | 'max') => {
                    if (bp === breakpointComposable.BREAKPOINTS.md && mode === 'max' && !isBetweenMDAndFourXL) {
                        return ref(true);
                    }
                    return ref(false);
                });
            isNavColumnExtended.value = true;
            const wrapper = render(NavigationDrawer);

            const xButton = await screen.findByTestId('NavXButton');
            expect(xButton).toBeInTheDocument();

            await user.click(xButton);

            expect(isNavColumnExtended.value).toBe(!isBetweenMDAndFourXL);
            if (isBetweenMDAndFourXL) expect(wrapper.emitted().activateBackdrop).toStrictEqual([[false]]);
            else expect(wrapper.emitted().activateBackdrop).toBe(undefined);
            if (!isBetweenMDAndFourXL) expect(wrapper.emitted().toggleNavMenu).toStrictEqual([[]]);
            else expect(wrapper.emitted().toggleNavMenu).toBe(undefined);
            mockUseBreakPoint.mockRestore();
        });
    });
    describe.each([
        [false],
        [true],
    ])('it should toggle the nav column when clicking on the initials of the user', (isBetweenMDAndFourXL) => {
        it(`where isBetweenMDAndFourXL is '${isBetweenMDAndFourXL}'`, async () => {
            const mockUseBreakPoint = vi.spyOn(breakpointComposable, 'useBreakpoint')
                .mockImplementation((bp: string, mode?: 'min' | 'max') => {
                    if (bp === breakpointComposable.BREAKPOINTS.md && mode === 'max' && !isBetweenMDAndFourXL) {
                        return ref(true);
                    }
                    return ref(false);
                });
            const wrapper = render(NavigationDrawer);
            await flushPromises();
            const initialsContainer = await screen.findByTestId('BaseInitials Small');
            const initials = await screen.findByTestId('BaseInitials initials');
            expect(initials.textContent).toStrictEqual('MM');
            await user.click(initialsContainer);
            if (isBetweenMDAndFourXL) expect(wrapper.emitted().activateBackdrop).toStrictEqual([[true]]);
            else expect(wrapper.emitted().activateBackdrop).toBe(undefined);
            expect(isNavColumnExtended.value).toBe(isBetweenMDAndFourXL);
            mockUseBreakPoint.mockRestore();
        });
    });
    describe.each([
        [false, false],
        [true, false],
        [true, true],
    ])('check document cookie for logging out', (hasCookie, cookieIsValid) => {
        it(`where a cookie is ${hasCookie ? 'set' : 'not set'}.
            The cookie will be ${cookieIsValid ? 'valid' : 'invalid'}`, async () => {
            const validCookie = 'ASP-XSRF-TOKEN=123abc45-67de-890f-12gh-i345678ij9k0';
            document.cookie = '';
            if (hasCookie) {
                document.cookie = cookieIsValid ? validCookie : 'INVALID_COOKIE';
            }
            render(NavigationDrawer);
            await flushPromises();
            const logoutInput = await screen.findByTestId('logout input') as HTMLInputElement;
            expect(logoutInput.value)
                .toStrictEqual(hasCookie && cookieIsValid ? '123abc45-67de-890f-12gh-i345678ij9k0' : '');
        });
    });
    it('should remove the resize event after unmounting the component', async () => {
        const spyAddEventListener = vi.spyOn(window, 'addEventListener');
        const spyRemoveEventListener = vi.spyOn(window, 'removeEventListener');
        const wrapper = mount(NavigationDrawer);
        expect(spyAddEventListener).toHaveBeenCalledTimes(1);
        expect(spyAddEventListener.mock.calls[0][0]).toStrictEqual('resize');
        const resizeFunction = spyAddEventListener.mock.calls[0][1];
        expect(wrapper.emitted().activateBackdrop).toBe(undefined);
        window.dispatchEvent(new Event('resize'));
        expect(wrapper.emitted().activateBackdrop.length).toBe(1);
        wrapper.unmount();
        window.dispatchEvent(new Event('resize'));
        expect(wrapper.emitted().activateBackdrop).toBe(undefined);
        expect(spyRemoveEventListener).toHaveBeenCalledTimes(1);
        expect(spyRemoveEventListener.mock.calls[0][0]).toStrictEqual('resize');
        expect(spyRemoveEventListener.mock.calls[0][1]).toBe(resizeFunction);
        spyRemoveEventListener.mockRestore();
        spyAddEventListener.mockRestore();
    });
});
