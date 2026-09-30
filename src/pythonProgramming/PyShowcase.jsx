/**
 * PyShowcase — full-bleed hero scenes for BEC305 Python Programming.
 *
 * Keyed by slide id (`mN-uK-ops`). buildSlides swaps the normal split layout
 * for a showcase whenever a unit's "watch" beat is registered here, so each
 * module gets two slides where the mechanism fills the stage.
 */
import {
  ElifChainScene,
  ScopeBoxesScene,
  AliasingScene,
  NestedTreeScene,
  GreedyLazyScene,
  FileModeScene,
  ObjectMutationScene,
  OperatorTranslateScene,
  HttpExchangeScene,
  JoinOnScene,
} from './PyScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="py-showcase-scene">{scene}</div>,
  }
}

const SHOWCASES = {
  'm1-u10-ops': wrap(
    'The elif chain — the first True wins and the rest never run',
    <ElifChainScene />,
    'Order the conditions from most specific to least; a later branch can never rescue an earlier wrong match.',
    'overhead-board',
    'py-branch-select',
    'elif-chain',
  ),
  'm1-u15-ops': wrap(
    'Scope — a local name lives and dies with the call',
    <ScopeBoxesScene />,
    'Reading a global is free; writing one makes a local, unless you declare global. One assignment makes the name local for the whole body.',
    'pull-frame',
    'py-scope-frame',
    'scope',
  ),
  'm2-u8-ops': wrap(
    'References — three ways to get a second name, one real copy',
    <AliasingScene />,
    'b = a shares the object, .copy() duplicates only the outside, deepcopy() duplicates all the way down.',
    'side-by-side',
    'py-reference-graph',
    'aliasing',
  ),
  'm2-u12-ops': wrap(
    'Nested structures — one bracket per level, left to right',
    <NestedTreeScene />,
    'allGuests[name][item] descends two levels; a missing level raises KeyError, so walk it with .get().',
    'wide-tree',
    'py-tree-descend',
    'nested',
  ),
  'm3-u7-ops': wrap(
    'Greedy versus lazy — both match, only one is what you meant',
    <GreedyLazyScene />,
    'Greedy takes everything then gives back; the ? after a quantifier makes it take as little as will do.',
    'follow-span',
    'py-match-span',
    'greedy',
  ),
  'm3-u14-ops': wrap(
    'Open, use, close — and why with does the closing',
    <FileModeScene />,
    "'w' truncates the file the instant it opens. Use with, and the file closes even when the block raises.",
    'overhead-board',
    'py-file-mode',
    'file-io',
  ),
  'm4-u5-ops': wrap(
    'Objects are mutable — the function edits your object, not a copy',
    <ObjectMutationScene />,
    'Passing an argument binds a second name to the same object. Say in the docstring whether you wrote a modifier or a pure function.',
    'pull-object',
    'py-object-graph',
    'mutation',
  ),
  'm4-u14-ops': wrap(
    'Operator overloading — every operator is a method call',
    <OperatorTranslateScene />,
    'a + b is a.__add__(b). Define the method and the operator starts working on your own type.',
    'side-by-side',
    'py-dunder-map',
    'operators',
  ),
  'm5-u1-ops': wrap(
    'HTTP — one request, one response, nothing remembered',
    <HttpExchangeScene />,
    'Check the status code before you touch the body. The protocol holds no state, which is why logins need cookies or tokens.',
    'wide-wire',
    'py-request-response',
    'http',
  ),
  'm5-u15-ops': wrap(
    'JOIN … ON — the clause that turns every combination into the meaningful ones',
    <JoinOnScene />,
    'Without ON you get rows × rows of nonsense. The ON clause states which foreign key points at which primary key.',
    'overhead-table',
    'py-join-filter',
    'join',
  ),
}

export function getShowcase(id) {
  return SHOWCASES[id] || null
}
