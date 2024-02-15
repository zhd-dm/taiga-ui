import {InjectionToken, Optional, Provider, SkipSelf} from '@angular/core';
import {tuiCreateToken} from '@taiga-ui/cdk';
import {TUI_DEFAULT_NUMBER_FORMAT} from '@taiga-ui/core/constants';
import {TuiNumberFormatSettings} from '@taiga-ui/core/interfaces';
import {combineLatest, map, Observable, of} from 'rxjs';

/**
 * Formatting configuration for displayed numbers
 */
export const TUI_NUMBER_FORMAT: InjectionToken<Observable<TuiNumberFormatSettings>> =
    tuiCreateToken(of(TUI_DEFAULT_NUMBER_FORMAT));

export function tuiNumberFormatProvider(
    options: Observable<Partial<TuiNumberFormatSettings>>,
): Provider {
    return {
        provide: TUI_NUMBER_FORMAT,
        deps: [[new Optional(), new SkipSelf(), TUI_NUMBER_FORMAT]],
        useFactory: (
            parent: Observable<TuiNumberFormatSettings> | null,
        ): Observable<TuiNumberFormatSettings> =>
            combineLatest([parent || of(TUI_DEFAULT_NUMBER_FORMAT), options]).pipe(
                map(([parent, options]) => ({...parent, ...options})),
            ),
    };
}
