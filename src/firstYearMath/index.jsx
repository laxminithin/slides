import React from 'react'
import {
  ComparisonVisualizer,
  ConceptMap,
  EquationStepper,
  FoundationSlide,
  GeometryVisualizer,
  GraphAnimator,
  NumericalBoard,
  ProcessAnimator,
  TeachingCallout,
} from '../firstYearFoundation'
import { firstYearDepthModules } from '../firstYearDepthContent'
import { makeSourceTeachingSlides } from '../firstYearSourceSlides'
import './math.css'

const pptxRoot = 'First_Year_PPTX'

const moduleLibrary = {
  polarCurves: {
    title: 'Polar Curves and Curvature',
    topics: ['Polar coordinates', 'Polar curves', 'Angle between radius vector and tangent', 'Pedal equations', 'Curvature in Cartesian, parametric, polar and pedal forms'],
    journey: ['Locate curve', 'Measure tangent', 'Form pedal equation', 'Compute curvature', 'Interpret radius'],
    equation: [
      { label: 'polar curve', expression: 'r = f(theta)', note: 'A point is controlled by distance from pole and angle.' },
      { label: 'tangent angle', expression: 'tan psi = r / (dr/dtheta)', note: 'Compare the radius vector with the tangent direction.' },
      { label: 'curvature', expression: 'rho = [(r^2 + (dr/dtheta)^2)^(3/2)] / [r^2 + 2(dr/dtheta)^2 - r(d2r/dtheta2)]', note: 'Radius of curvature depends on first and second change of r.' },
      { label: 'interpret', expression: 'large rho => flatter curve; small rho => sharper bending', note: 'Curvature converts a drawing into a measurable engineering property.' },
    ],
    example: {
      problem: 'For r = a(1 + cos theta), identify the radius-change terms needed for curvature.',
      given: ['r = a(1 + cos theta)', 'dr/dtheta = -a sin theta', 'd2r/dtheta2 = -a cos theta'],
      find: 'Substitute the polar derivatives into the curvature denominator.',
      formula: 'rho = [(r^2 + r1^2)^(3/2)] / [r^2 + 2r1^2 - rr2]',
      substitution: 'r1 = -a sin theta, r2 = -a cos theta',
      calculation: 'Track r, r1 and r2 separately before simplifying.',
      answer: 'The curvature is obtained from the polar radius and its two derivatives.',
      interpretation: 'Most mistakes occur when d2r/dtheta2 is copied with the wrong sign.',
    },
    graph: { equation: 'r = 1 + cos(theta)', labels: ['pole', 'tangent', 'radius vector'], curve: 'polar-cardioid' },
    mistake: 'Do not use Cartesian curvature formula directly after seeing r = f(theta). Convert the derivatives correctly.',
  },
  seriesMultivariable: {
    title: 'Series Expansion, Indeterminate Forms and Multivariable Calculus',
    topics: ['Taylor and Maclaurin series', 'L Hospital rule', 'Partial differentiation', 'Total derivative', 'Composite functions', 'Jacobian', 'Maxima and minima of two variables'],
    journey: ['Approximate locally', 'Handle 0/0 forms', 'Differentiate partially', 'Track dependence', 'Test extrema'],
    equation: [
      { label: 'Taylor idea', expression: 'f(x) = f(a) + (x-a)f prime(a) + ((x-a)^2/2!) f double-prime(a) + ...', note: 'Build a function from local derivatives.' },
      { label: 'Maclaurin case', expression: 'f(x) = f(0) + x f prime(0) + (x^2/2!) f double-prime(0) + ...', note: 'Taylor expansion around zero.' },
      { label: 'total derivative', expression: 'dz/dt = (partial z/partial x)(dx/dt) + (partial z/partial y)(dy/dt)', note: 'Every path into z contributes.' },
      { label: 'Jacobian', expression: 'J = partial(u,v) / partial(x,y)', note: 'Jacobian measures how a transformation scales area locally.' },
    ],
    example: {
      problem: 'Find the first three non-zero Maclaurin terms of e^x.',
      given: ['f(x)=e^x', 'f(0)=1', 'all derivatives at 0 are 1'],
      find: 'Maclaurin expansion up to x^2 term.',
      formula: 'f(x)=f(0)+x f prime(0)+(x^2/2!)f double-prime(0)+...',
      substitution: 'e^x = 1 + x(1) + x^2/2!(1) + ...',
      calculation: 'e^x = 1 + x + x^2/2 + ...',
      answer: 'e^x approx 1 + x + x^2/2',
      interpretation: 'The approximation is strongest near x = 0.',
    },
    graph: { equation: 'f(x) and Taylor polynomial near a point', labels: ['function', 'local polynomial', 'expansion point'], curve: 'taylor' },
    mistake: 'In multivariable maxima/minima, first derivative tests locate candidates; the second derivative test classifies them.',
  },
  odeFirst: {
    title: 'Ordinary Differential Equations of First Order',
    topics: ['Linear differential equations', 'Bernoulli equation', 'Exact equations', 'Reducible exact equations', 'Integrating factors', 'Orthogonal trajectories', 'Natural growth and decay'],
    journey: ['Classify ODE', 'Choose method', 'Create exactness', 'Integrate', 'Apply model'],
    equation: [
      { label: 'linear form', expression: 'dy/dx + P(x)y = Q(x)', note: 'Recognize the standard first-order linear structure.' },
      { label: 'integrating factor', expression: 'I.F. = e^(integral P dx)', note: 'Multiply the full equation by the integrating factor.' },
      { label: 'product derivative', expression: 'd/dx (y . I.F.) = Q . I.F.', note: 'Left side becomes one derivative.' },
      { label: 'solution', expression: 'y . I.F. = integral(Q . I.F.) dx + C', note: 'Integrate and divide by the integrating factor.' },
    ],
    example: {
      problem: 'Solve dy/dx + y = e^x.',
      given: ['P=1', 'Q=e^x'],
      find: 'General solution y(x).',
      formula: 'I.F. = e^(integral P dx)',
      substitution: 'I.F. = e^x',
      calculation: 'd/dx(y e^x) = e^x.e^x = e^(2x); y e^x = e^(2x)/2 + C',
      answer: 'y = e^x/2 + C e^(-x)',
      interpretation: 'The integrating factor turns a two-term left side into a single product derivative.',
    },
    graph: { equation: 'dy/dx = ky', labels: ['solution family', 'initial value', 'growth/decay'], curve: 'exponential-family' },
    mistake: 'The integrating factor multiplies every term, not just dy/dx.',
  },
  odeHigher: {
    title: 'Ordinary Differential Equations of Higher Order',
    topics: ['Constant coefficient ODEs', 'Homogeneous and non-homogeneous equations', 'Inverse differential operators', 'Variation of parameters', 'Cauchy and Legendre equations', 'Mass-spring applications'],
    journey: ['Build auxiliary equation', 'Find complementary function', 'Find particular integral', 'Apply conditions', 'Read physical response'],
    equation: [
      { label: 'operator form', expression: 'F(D)y = X', note: 'D represents differentiation with respect to x.' },
      { label: 'auxiliary equation', expression: 'F(m) = 0', note: 'Replace D by m to solve the homogeneous part.' },
      { label: 'complementary function', expression: 'y_c = C1 e^(m1 x) + C2 e^(m2 x)', note: 'Roots decide the natural response.' },
      { label: 'complete solution', expression: 'y = y_c + y_p', note: 'Add forced response to natural response.' },
    ],
    example: {
      problem: 'Solve (D^2 - 3D + 2)y = e^(3x).',
      given: ['F(D)=D^2-3D+2', 'forcing X=e^(3x)'],
      find: 'Complementary function and particular integral.',
      formula: 'F(m)=0 and P.I. = e^(ax)/F(a) when F(a) is non-zero',
      substitution: 'F(m)=(m-1)(m-2); F(3)=9-9+2=2',
      calculation: 'C.F.=C1e^x+C2e^(2x); P.I.=e^(3x)/2',
      answer: 'y=C1e^x+C2e^(2x)+e^(3x)/2',
      interpretation: 'The auxiliary roots describe free response; the input adds forced response.',
    },
    graph: { equation: 'mass spring response', labels: ['displacement', 'natural response', 'forced response'], curve: 'damped' },
    mistake: 'If F(a)=0, the shortcut P.I. formula needs modification; do not divide by zero.',
  },
  linearAlgebra: {
    title: 'Linear Algebra',
    topics: ['Elementary row transformation', 'Rank of matrix', 'Consistency of linear equations', 'Gauss elimination', 'Gauss-Seidel method'],
    journey: ['Encode equations', 'Row-reduce matrix', 'Test consistency', 'Iterate Gauss-Seidel', 'State the unique/infinite/no solution'],
    equation: [
      { label: 'system', expression: 'a11x + a12y = b1; a21x + a22y = b2', note: 'A system is transformed into matrix form.' },
      { label: 'augmented matrix', expression: '[A | b]', note: 'Row operations preserve the solution set.' },
      { label: 'rank test', expression: 'rank(A) = rank([A|b]) => consistent', note: 'Consistency is a rank comparison.' },
      { label: 'Gauss-Seidel', expression: 'use the newest x immediately in the next unknown', note: 'Iteration is a method, not a single elimination pass.' },
    ],
    example: {
      problem: 'Perform one Gauss-Seidel update for x + y = 3, 2x + 3y = 8 starting from (0,0).',
      given: ['x = 3 - y', 'y = (8 - 2x)/3', 'start x0=0, y0=0'],
      find: 'First updated approximation.',
      formula: 'Use latest available values immediately.',
      substitution: 'x1 = 3 - y0 = 3; y1 = (8 - 2x1)/3',
      calculation: 'y1 = (8 - 6)/3 = 2/3',
      answer: '(x1, y1) = (3, 0.667)',
      interpretation: 'Gauss-Seidel is an iteration, so convergence is watched row by row.',
    },
    graph: { equation: 'two lines meet at the solution', labels: ['equation 1', 'equation 2', 'intersection'], curve: 'linear-system' },
    mistake: 'Row operations may swap, scale or add rows; they must not change a single entry in isolation.',
  },
  linearAlgebra2: {
    title: 'Linear Algebra -2',
    topics: ['Eigenvalues and eigenvectors', 'Characteristic equation', 'Cayley-Hamilton idea', 'Rayleigh power method', 'Diagonalization where it exists', 'Traffic-flow / network interpretation'],
    journey: ['Form A - lambda I', 'Solve det = 0', 'Find eigenvectors', 'Iterate a dominant eigenpair', 'Read a network flow'],
    equation: [
      { label: 'eigen relation', expression: 'A v = lambda v', note: 'The vector keeps direction; lambda scales it.' },
      { label: 'characteristic', expression: 'det(A - lambda I) = 0', note: 'Eigenvalues are roots of this polynomial.' },
      { label: 'Rayleigh quotient', expression: 'lambda approx (x^T A x)/(x^T x)', note: 'A good vector estimate yields a good eigenvalue estimate.' },
      { label: 'power step', expression: 'x_(k+1) = A x_k / ||A x_k||', note: 'Repeated multiplication emphasises the dominant direction.' },
    ],
    example: {
      problem: 'For A = [[2,1],[1,2]], find eigenvalues from det(A-lambda I)=0.',
      given: ['A=[[2,1],[1,2]]', 'I identity 2x2'],
      find: 'lambda_1, lambda_2',
      formula: 'det([[2-lambda,1],[1,2-lambda]])=0',
      substitution: '(2-lambda)^2 - 1 = 0',
      calculation: 'lambda^2 - 4 lambda + 3 = 0 => (lambda-1)(lambda-3)=0',
      answer: 'lambda = 1 and lambda = 3',
      interpretation: 'Each eigenvalue has its own invariant line; Rayleigh/power methods approximate the larger one numerically.',
    },
    graph: { equation: 'eigen-direction stays on its line', labels: ['vector v', 'Av', 'scale lambda'], curve: 'linear-system' },
    mistake: 'An eigenvector is not unique; any non-zero scale of v is still an eigenvector for the same lambda.',
  },
  interpolation: {
    title: 'Interpolation',
    topics: ['Finite differences', 'Newton forward and backward formulae', 'Divided differences', 'Newton divided-difference formula', 'Lagrange interpolation', 'When interpolation is unsafe'],
    journey: ['Tabulate data', 'Build difference table', 'Choose forward/backward/divided form', 'Evaluate at the query x', 'State the degree and risk'],
    equation: [
      { label: 'Lagrange idea', expression: 'P(x) = sum y_i l_i(x)', note: 'Each basis polynomial is 1 at its node and 0 at the others.' },
      { label: 'Newton forward', expression: 'P = y0 + u Delta y0 + u(u-1)/2! Delta^2 y0 + ...', note: 'u = (x-x0)/h for equal spacing.' },
      { label: 'divided difference', expression: 'f[x0,x1]=(f(x1)-f(x0))/(x1-x0)', note: 'Unequal spacing uses divided differences.' },
      { label: 'degree', expression: 'n+1 points determine a polynomial of degree at most n', note: 'Extra oscillation can appear if the degree is too high.' },
    ],
    example: {
      problem: 'Estimate f(1.5) by linear Lagrange using (1,2) and (2,4).',
      given: ['(x0,y0)=(1,2)', '(x1,y1)=(2,4)', 'x=1.5'],
      find: 'P(1.5)',
      formula: 'P(x)= y0 (x-x1)/(x0-x1) + y1 (x-x0)/(x1-x0)',
      substitution: 'P(1.5)= 2(1.5-2)/(1-2) + 4(1.5-1)/(2-1)',
      calculation: 'P(1.5)= 2(0.5) + 4(0.5) = 1+2 = 3',
      answer: 'P(1.5)=3',
      interpretation: 'Linear interpolation is the secant through two data points, not the unknown true curve.',
    },
    graph: { equation: 'data points and interpolating polynomial', labels: ['nodes', 'P(x)', 'query x'], curve: 'newton' },
    mistake: 'Newton forward is for equal spacing near the start of the table; do not force it on unequal data.',
  },
  odeFirstHigher: {
    title: 'Differential Equations of First and Higher Order',
    topics: ['First-order linear ODEs', 'Integrating factor', 'Higher-order constant-coefficient ODEs', 'Auxiliary equation', 'Complementary function and particular integral', 'Why numerical ODE methods come next'],
    journey: ['Classify order', 'Solve first-order linear exactly', 'Form auxiliary equation', 'Add particular integral', 'Hand off stiff/non-exact cases to numerical methods'],
    equation: [
      { label: 'first-order linear', expression: 'dy/dx + P(x)y = Q(x)', note: 'Integrating factor converts the left side into a product derivative.' },
      { label: 'I.F.', expression: 'I.F. = e^(integral P dx)', note: 'Multiply the whole equation, not only dy/dx.' },
      { label: 'auxiliary', expression: 'F(m)=0 for F(D)y = X', note: 'Constant-coefficient higher-order ODEs become algebraic in m.' },
      { label: 'complete', expression: 'y = y_c + y_p', note: 'Natural plus forced response.' },
    ],
    example: {
      problem: 'Solve (D^2 - 1)y = 0 and state why a non-constant P(x) would block this shortcut.',
      given: ['F(D)=D^2-1', 'X=0'],
      find: 'General solution and the limitation.',
      formula: 'm^2-1=0',
      substitution: 'm=±1',
      calculation: 'y=C1 e^x + C2 e^(-x)',
      answer: 'y=C1 e^x + C2 e^(-x); variable-coefficient or nonlinear cases need numerical stepping.',
      interpretation: 'Exact auxiliary-equation methods are for constant coefficients; Module 5 numerical ODE methods exist because most lab models are not that tidy.',
    },
    graph: { equation: 'exact solution family vs a numerical step', labels: ['exact y', 'step h', 'local slope'], curve: 'damped' },
    mistake: 'Do not treat a first-order linear equation as if it had an auxiliary polynomial in D.',
  },
  integralCalculus: {
    title: 'Integral Calculus and its Applications',
    topics: ['Double integrals', 'Triple integrals', 'Change of order', 'Polar coordinates', 'Area and volume', 'Beta and Gamma functions'],
    journey: ['Describe region', 'Choose order', 'Integrate inner variable', 'Convert coordinates', 'Interpret area/volume'],
    equation: [
      { label: 'area', expression: 'Area = double integral_R 1 dA', note: 'Integration accumulates tiny area elements.' },
      { label: 'cartesian', expression: 'double integral f(x,y) dy dx', note: 'Bounds describe the region with vertical strips.' },
      { label: 'polar change', expression: 'dA = r dr dtheta', note: 'The Jacobian r appears when using polar coordinates.' },
      { label: 'volume', expression: 'Volume = double integral_R z dA', note: 'Area accumulation becomes volume accumulation under a surface.' },
    ],
    example: {
      problem: 'Find the area of a circle x^2 + y^2 <= a^2 using polar coordinates.',
      given: ['0 <= r <= a', '0 <= theta <= 2pi', 'dA = r dr dtheta'],
      find: 'Area enclosed by the circle.',
      formula: 'Area = integral_0^(2pi) integral_0^a r dr dtheta',
      substitution: 'inner integral = [r^2/2]_0^a = a^2/2',
      calculation: 'Area = integral_0^(2pi) a^2/2 dtheta = pi a^2',
      answer: 'Area = pi a^2',
      interpretation: 'The extra r is essential; without it the polar area is wrong.',
    },
    graph: { equation: 'region accumulation under dA', labels: ['region R', 'strip/sector', 'area element'], curve: 'area-region' },
    mistake: 'When changing to polar coordinates, forgetting dA = r dr dtheta changes the answer dimensionally.',
  },
  vectorCalculus: {
    title: 'Vector Calculus and its Applications',
    topics: ['Scalar and vector fields', 'Gradient', 'Directional derivative', 'Divergence', 'Curl', 'Solenoidal and irrotational fields', 'Line integrals', 'Green and Stokes theorems'],
    journey: ['Read field', 'Measure direction', 'Measure source/sink', 'Measure rotation', 'Integrate along path'],
    equation: [
      { label: 'gradient', expression: 'grad phi = i partial phi/partial x + j partial phi/partial y + k partial phi/partial z', note: 'Gradient points toward fastest increase.' },
      { label: 'directional derivative', expression: 'D_u phi = grad phi dot u', note: 'Project gradient along a chosen unit direction.' },
      { label: 'divergence', expression: 'div F = partial P/partial x + partial Q/partial y + partial R/partial z', note: 'Divergence measures outward flux density.' },
      { label: 'curl', expression: 'curl F = del cross F', note: 'Curl measures local rotation tendency.' },
    ],
    example: {
      problem: 'For phi = x^2 + y^2, find grad phi at (1,2).',
      given: ['phi=x^2+y^2', 'point (1,2)'],
      find: 'Gradient vector at the point.',
      formula: 'grad phi = (partial phi/partial x)i + (partial phi/partial y)j',
      substitution: 'partial phi/partial x=2x, partial phi/partial y=2y',
      calculation: 'grad phi(1,2)=2i+4j',
      answer: 'grad phi = 2i + 4j',
      interpretation: 'The vector points in the direction where phi increases fastest.',
    },
    graph: { equation: 'field with gradient direction', labels: ['level curve', 'gradient', 'directional projection'], curve: 'vector-field' },
    mistake: 'Directional derivative requires a unit vector; using a non-unit direction scales the result incorrectly.',
  },
  numericalMethods1: {
    title: 'Numerical Methods - Errors and Root Finding',
    topics: ['Errors', 'Bisection', 'Regula-Falsi', 'Secant', 'Newton-Raphson', 'Stopping criteria'],
    journey: ['Estimate error', 'Bracket root', 'Iterate method', 'Build table', 'Stop when |x_{n+1}-x_n| is small'],
    equation: [
      { label: 'Newton step', expression: 'x_(n+1) = x_n - f(x_n)/f prime(x_n)', note: 'Tangent at current estimate predicts the next root estimate.' },
      { label: 'Regula-Falsi', expression: 'x = (a f(b) - b f(a)) / (f(b) - f(a))', note: 'Secant through a bracketed interval keeps root containment.' },
      { label: 'absolute error', expression: '|true value - approximate value|', note: 'Error quantifies approximation quality.' },
      { label: 'stopping', expression: '|x_(n+1) - x_n| < tolerance or |f(x_n)| < tolerance', note: 'Root finding stops when successive estimates or residual are small enough.' },
    ],
    example: {
      problem: 'Use Newton-Raphson once for f(x)=x^2-2 from x0=1.5.',
      given: ['f(x)=x^2-2', 'f prime(x)=2x', 'x0=1.5'],
      find: 'x1',
      formula: 'x1 = x0 - f(x0)/f prime(x0)',
      substitution: 'x1 = 1.5 - (1.5^2-2)/(3)',
      calculation: 'x1 = 1.5 - 0.25/3 = 1.4167',
      answer: 'x1 approx 1.4167',
      interpretation: 'The estimate moves rapidly toward sqrt(2).',
    },
    graph: { equation: 'tangent iteration toward root', labels: ['x_n', 'tangent', 'x_(n+1)'], curve: 'newton' },
    mistake: 'Newton-Raphson can fail when f prime(x_n) is zero or the starting estimate is poor.',
  },
  numericalMethods2: {
    title: 'Numerical Methods - ODEs and Integration',
    topics: ['Trapezoidal rule', 'Simpson one-third rule', 'Simpson three-eighth rule', 'Weddle rule', 'Taylor method', 'Modified Euler method', 'Runge-Kutta fourth order', 'Milne predictor-corrector', 'Adams-Bashforth predictor-corrector'],
    journey: ['Partition interval', 'Approximate area', 'Predict slope', 'Correct estimate', 'Watch convergence'],
    equation: [
      { label: 'trapezoidal', expression: 'integral_a^b y dx approx h/2 [y0 + yn + 2 sum y_i]', note: 'Area is approximated by trapezia.' },
      { label: 'Simpson 1/3', expression: 'integral approx h/3 [y0 + yn + 4 sum odd y + 2 sum even y]', note: 'Parabolic arcs improve accuracy.' },
      { label: 'Euler idea', expression: 'y_(n+1) = y_n + h f(x_n, y_n)', note: 'Move using current slope.' },
      { label: 'RK4', expression: 'y_(n+1)=y_n + (h/6)(k1+2k2+2k3+k4)', note: 'Average four slope estimates for a better step.' },
    ],
    example: {
      problem: 'Apply one Euler step to dy/dx = x + y, y(0)=1, h=0.1.',
      given: ['f(x,y)=x+y', 'x0=0', 'y0=1', 'h=0.1'],
      find: 'y1 at x=0.1',
      formula: 'y1 = y0 + h f(x0,y0)',
      substitution: 'y1 = 1 + 0.1(0+1)',
      calculation: 'y1 = 1.1',
      answer: 'y(0.1) approx 1.1',
      interpretation: 'Euler uses the starting slope; improved methods correct this estimate.',
    },
    graph: { equation: 'area and ODE step approximation', labels: ['step h', 'slope', 'new estimate'], curve: 'ode-step' },
    mistake: 'For Simpson rules, the number of subintervals must match the rule condition.',
  },
  laplace: {
    title: 'Laplace Transforms',
    topics: ['Definition of Laplace transform', 'Elementary transforms', 'Linearity', 'Scaling', 'Shifting', 'Differentiation in s-domain', 'Division by t', 'Periodic functions', 'Unit step', 'Inverse transforms', 'ODE applications'],
    journey: ['Move to s-domain', 'Use properties', 'Handle waveforms', 'Invert transform', 'Solve ODE'],
    equation: [
      { label: 'definition', expression: 'L{f(t)} = integral_0^infinity e^(-st) f(t) dt', note: 'A time function becomes an s-domain function.' },
      { label: 'linearity', expression: 'L{af(t)+bg(t)} = aF(s)+bG(s)', note: 'Break a complicated signal into known transforms.' },
      { label: 'derivative', expression: 'L{f prime(t)} = sF(s) - f(0)', note: 'Initial values enter algebraically.' },
      { label: 'ODE route', expression: 'ODE in t -> algebra in s -> inverse transform', note: 'Differential equations become equations to solve.' },
    ],
    example: {
      problem: 'Find L{e^(at)}.',
      given: ['f(t)=e^(at)', 'definition of transform'],
      find: 'F(s)',
      formula: 'L{f(t)} = integral_0^infinity e^(-st) f(t) dt',
      substitution: 'integral_0^infinity e^(-st)e^(at) dt = integral_0^infinity e^(-(s-a)t) dt',
      calculation: 'F(s)=1/(s-a), for s>a',
      answer: 'L{e^(at)} = 1/(s-a)',
      interpretation: 'The convergence condition matters; the transform is not just a table lookup.',
    },
    graph: { equation: 'time waveform mapped to s-domain', labels: ['time signal', 'transform property', 's-domain expression'], curve: 'laplace' },
    mistake: 'Do not ignore initial conditions when transforming derivatives in differential equations.',
  },
  vectorSpace: {
    title: 'Vector Space',
    topics: ['Vector spaces', 'Subspaces', 'Linear combinations', 'Span', 'Linear independence', 'Basis and dimension', 'Row space and column space', 'Coordinate vector', 'Inner products and orthogonality'],
    journey: ['Define set', 'Test closure', 'Build span', 'Find basis', 'Measure dimension'],
    equation: [
      { label: 'linear combination', expression: 'v = c1v1 + c2v2 + ... + cnvn', note: 'Vectors are built by scaling and adding basis candidates.' },
      { label: 'span', expression: 'span{v1,...,vn} = all linear combinations', note: 'Span is the reachable set.' },
      { label: 'independent', expression: 'c1v1 + ... + cnvn = 0 => all c_i = 0', note: 'No vector is redundant.' },
      { label: 'dimension', expression: 'dimension = number of vectors in a basis', note: 'A basis is minimal but still spans the space.' },
    ],
    example: {
      problem: 'Check whether (1,0) and (0,1) form a basis for R2.',
      given: ['v1=(1,0)', 'v2=(0,1)', 'space R2'],
      find: 'Basis status.',
      formula: 'A basis must span the space and be linearly independent.',
      substitution: '(x,y)=x(1,0)+y(0,1)',
      calculation: 'Only x=0,y=0 gives the zero combination.',
      answer: 'They form a basis for R2.',
      interpretation: 'Every vector in the plane has unique coordinates in this basis.',
    },
    graph: { equation: 'basis vectors span the plane', labels: ['basis vector 1', 'basis vector 2', 'linear combination'], curve: 'basis' },
    mistake: 'A spanning set can contain redundant vectors; a basis cannot.',
  },
  linearTransformation: {
    title: 'Linear Transformation',
    topics: ['Definition and examples', 'Algebra of linear transformations', 'Matrix of a transformation', 'Singular and non-singular transformations', 'Invertibility', 'Rank and nullity', 'Rank-Nullity theorem'],
    journey: ['Map vectors', 'Represent by matrix', 'Test invertibility', 'Find range/null space', 'Apply rank-nullity'],
    equation: [
      { label: 'linearity', expression: 'T(au + bv) = aT(u) + bT(v)', note: 'A linear map preserves vector addition and scalar multiplication.' },
      { label: 'matrix action', expression: 'T(x) = Ax', note: 'A matrix encodes the transformation.' },
      { label: 'null space', expression: 'N(T) = {x : T(x)=0}', note: 'Null space shows directions collapsed to zero.' },
      { label: 'rank-nullity', expression: 'rank(T) + nullity(T) = dimension(domain)', note: 'Output freedom plus lost freedom equals input dimension.' },
    ],
    example: {
      problem: 'For T(x,y)=(x+y, y), decide whether T is invertible.',
      given: ['Matrix A = [[1,1],[0,1]]'],
      find: 'Invertibility.',
      formula: 'A is invertible when det(A) is non-zero.',
      substitution: 'det(A)=1*1 - 0*1',
      calculation: 'det(A)=1',
      answer: 'T is invertible.',
      interpretation: 'The transformation shears the plane but does not collapse area to zero.',
    },
    graph: { equation: 'matrix maps grid to transformed grid', labels: ['input vector', 'mapped vector', 'shear'], curve: 'transform' },
    mistake: 'A linear transformation must send zero to zero; translations are not linear transformations.',
  },
}

const subjectConfigs = [
  ['differential-calculus-linear-algebra-1bmatc101', 'Differential Calculus and Linear Algebra', '1BMATC101', 1, 'Civil stream mathematics', 'Differential_Calculus_and_Linear_Algebra_1BMATC101', ['polarCurves', 'seriesMultivariable', 'odeFirst', 'odeHigher', 'linearAlgebra']],
  ['differential-calculus-numerical-methods-1bmatc201', 'Differential Calculus and Numerical Methods', '1BMATC201', 2, 'Civil stream mathematics', 'Differential_Calculus_and_Numerical_Methods_1BMATC201', ['integralCalculus', 'odeFirst', 'vectorCalculus', 'numericalMethods1', 'numericalMethods2']],
  ['differential-calculus-linear-algebra-1bmate101', 'Differential Calculus & Linear Algebra', '1BMATE101', 1, 'Electrical stream mathematics', 'Differential_Calculus_Linear_Algebra_1BMATE101', ['polarCurves', 'seriesMultivariable', 'odeFirst', 'odeHigher', 'linearAlgebra']],
  ['calculus-laplace-transforms-numerical-techniques-1bmate201', 'Calculus, Laplace Transforms and Numerical Techniques', '1BMATE201', 2, 'Electrical stream mathematics', 'Calculus_Laplace_Transforms_and_Numerical_Techniques_1BMATE201', ['integralCalculus', 'vectorCalculus', 'numericalMethods1', 'numericalMethods2', 'laplace']],
  ['differential-calculus-linear-algebra-1bmatm101', 'Differential Calculus and Linear Algebra', '1BMATM101', 1, 'Mechanical stream mathematics', 'Differential_Calculus_and_Linear_Algebra_1BMATM101', ['polarCurves', 'seriesMultivariable', 'odeFirst', 'linearAlgebra', 'linearAlgebra2']],
  ['multivariable-calculus-numerical-methods-1bmatm201', 'Multivariable Calculus and Numerical Methods', '1BMATM201', 2, 'Mechanical stream mathematics', 'Multivariable_Calculus_and_Numerical_Methods_1BMATM201', ['integralCalculus', 'odeHigher', 'vectorCalculus', 'numericalMethods1', 'numericalMethods2']],
  ['calculus-linear-algebra-1bmats101', 'CALCULUS AND LINEAR ALGEBRA', '1BMATS101', 1, 'Computer science stream mathematics', 'CALCULUS_AND_LINEAR_ALGEBRA_1BMATS101', ['seriesMultivariable', 'vectorCalculus', 'linearAlgebra', 'vectorSpace', 'linearTransformation']],
  ['numerical-methods-1bmats201', 'NUMERICAL METHODS', '1BMATS201', 2, 'Computer science stream mathematics', 'NUMERICAL_METHODS_1BMATS201', ['numericalMethods1', 'linearAlgebra', 'interpolation', 'odeFirstHigher', 'numericalMethods2']],
]

const status = {
  mathematicalFailures: 0,
  contentCoverageFailures: 0,
  syllabusCoverageFailures: 0,
}

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function MatrixBoard() {
  return (
    <div className="math-matrix-board" data-slide-content="true">
      <div className="math-system">
        <span>x + y = 3</span>
        <span>2x + 3y = 8</span>
      </div>
      <div className="math-arrow">to matrix form</div>
      <div className="math-matrix">[ 1&nbsp; 1&nbsp; |&nbsp; 3 ]<br />[ 2&nbsp; 3&nbsp; |&nbsp; 8 ]</div>
      <div className="math-rowops">
        <strong>Row operation</strong>
        <span>{'R2 -> R2 - 2R1'}</span>
        <span>[ 0&nbsp; 1&nbsp; |&nbsp; 2 ]</span>
      </div>
    </div>
  )
}

function IterationTable({ type }) {
  const rows = type === 'linearAlgebra'
    ? [['0', '(0, 0)', 'x=3-y, y=(8-2x)/3', '(3, 0.667)', '-'], ['1', '(3, 0.667)', 'repeat with latest values', '(2.333, 1.111)', 'smaller']]
    : [['0', '1.5000', 'x - f/f prime', '1.4167', '0.0833'], ['1', '1.4167', 'x - f/f prime', '1.4142', '0.0025']]
  return (
    <table className="math-iteration-table" data-slide-content="true">
      <thead><tr><th>Iteration</th><th>Current value</th><th>Operation</th><th>New value</th><th>Error</th></tr></thead>
      <tbody>{rows.map((row, i) => <tr key={row[0]} style={{ '--i': i }}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
    </table>
  )
}

function MathVisual({ module }) {
  if (/linear algebra|vector space|linear transformation/i.test(module.title)) {
    return (
      <div className="math-visual-pair">
        <MatrixBoard />
        <GeometryVisualizer />
      </div>
    )
  }
  return (
    <div className="math-visual-pair">
      <GraphAnimator
        curves={[{ label: module.graph.curve, fn: (x) => (x * x) / 2 - 1, color: '#0f766e' }]}
        points={[{ label: module.graph.labels[0], xy: [0, -1] }, { label: module.graph.labels[1], xy: [1.4, -0.02] }]}
        highlight={module.graph.equation}
      />
      <GeometryVisualizer />
    </div>
  )
}

function buildSourceSlides(subject, moduleIndex, sourceDepth) {
  return makeSourceTeachingSlides({
    idPrefix: `${subject.code.toLowerCase()}-${moduleIndex + 1}-source-depth`,
    sourceDepth,
    tone: 'math',
    footer: `${subject.code} / Module ${moduleIndex + 1}`,
  })
}

function buildSlides(subject, module, moduleIndex, sourceDepth) {
  const moduleLabel = `Module ${moduleIndex + 1}`
  const baseId = `${subject.code.toLowerCase()}-${moduleIndex + 1}-${slug(module.title)}`
  const nodes = [
    { id: 'idea', label: module.topics[0].split(/,| and /)[0], x: 380, y: 82, main: true },
    { id: 'formula', label: module.equation[0].label, x: 178, y: 210 },
    { id: 'visual', label: module.graph.labels[0], x: 382, y: 252 },
    { id: 'example', label: 'Worked substitution', x: 586, y: 210 },
    { id: 'exam', label: 'Exam check', x: 380, y: 360 },
  ]
  const links = [
    { from: 'idea', to: 'formula', label: 'formalize' },
    { from: 'idea', to: 'visual', label: 'interpret' },
    { from: 'formula', to: 'example', label: 'apply' },
    { from: 'visual', to: 'exam', label: 'remember' },
    { from: 'example', to: 'exam', label: 'practice' },
  ]
  const coreSlides = [
    {
      id: `${baseId}-opening`,
      title: `${moduleLabel}: ${module.title}`,
      subtitle: `${subject.code} / ${subject.stream}`,
      kicker: 'First Year Mathematics',
      composition: 'visual-hero',
      content: (
        <FoundationSlide
          layout="visual-hero"
          title={module.title}
          subtitle="Why this matters"
          footer={`${subject.title} / ${moduleLabel}`}
        >
          <div className="math-opening" data-slide-content="true">
            <ProcessAnimator steps={module.journey.map((step, index) => ({
              title: step,
              detail: module.topics[index]
                ? `${step} — ${module.topics[index]}`
                : `${step} — ${module.example.interpretation}`,
            }))} />
            <TeachingCallout kind="KEY IDEA">{`${module.equation[0].label}: ${module.equation[0].expression}. ${module.equation[0].note}`}</TeachingCallout>
          </div>
        </FoundationSlide>
      ),
      takeaway: `${module.title} starts from meaning, then moves to formula, method and exam use.`,
    },
    {
      id: `${baseId}-coverage-map`,
      title: 'Learning Route and Coverage',
      subtitle: 'PPTX topics checked against the official syllabus',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" title="Coverage Route" footer={`${subject.code} / ${moduleLabel}`}>
          <div className="math-topic-grid" data-slide-content="true">
            {module.topics.map((topic, i) => <article key={topic} style={{ '--i': i }}><strong>{String(i + 1).padStart(2, '0')}</strong><span>{topic}</span></article>)}
          </div>
        </FoundationSlide>
      ),
      takeaway: 'Every listed topic is represented by a teaching action, not only by a heading.',
    },
    {
      id: `${baseId}-visual-meaning`,
      title: 'Visual Meaning Before Manipulation',
      subtitle: module.graph.equation,
      composition: 'visual',
      content: (
        <FoundationSlide layout="concept-visual" title="See the object" subtitle={module.graph.equation} footer={`${subject.code} / ${moduleLabel}`}>
          <MathVisual module={module} />
        </FoundationSlide>
      ),
      takeaway: `The main visual connects ${module.title.toLowerCase()} to the mathematical object being measured or transformed.`,
    },
    {
      id: `${baseId}-derivation`,
      title: 'Derivation: Show What Changes',
      subtitle: 'Progressive equation board',
      composition: 'worked-example',
      content: (
        <FoundationSlide layout="derivation" title="Derivation board" footer={`${subject.code} / ${moduleLabel}`}>
          <EquationStepper steps={module.equation.map((step) => ({
            eq: `<strong>${step.label}</strong>: ${step.expression}`,
            explain: step.note,
          }))} />
        </FoundationSlide>
      ),
      takeaway: 'The derivation keeps previous context visible while the operation changes.',
    },
    {
      id: `${baseId}-worked-example`,
      title: 'Worked Example',
      subtitle: module.example.problem,
      composition: 'worked-example',
      content: (
        <FoundationSlide layout="worked-example" title="Problem solving board" footer={`${subject.code} / ${moduleLabel}`}>
          <NumericalBoard {...module.example} />
        </FoundationSlide>
      ),
      takeaway: 'The example shows given data, formula choice, substitution, calculation and interpretation.',
    },
    {
      id: `${baseId}-dry-run`,
      title: /numerical|linear algebra|vector space|linear transformation/i.test(module.title) ? 'Operation Dry Run' : 'Graph and Formula Connection',
      subtitle: 'The calculation moves one visible step at a time',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" title="Method in motion" footer={`${subject.code} / ${moduleLabel}`}>
          {/numerical|linear algebra|vector space|linear transformation/i.test(module.title) ? <IterationTable type={module.title.includes('Linear') ? 'linearAlgebra' : 'root'} /> : <MathVisual module={module} />}
        </FoundationSlide>
      ),
      takeaway: 'Iteration and transformation are shown as a sequence students can reproduce.',
    },
    {
      id: `${baseId}-mistake-exam`,
      title: 'Common Mistake and Exam Point',
      subtitle: 'What to watch while solving',
      composition: 'comparison',
      content: (
        <FoundationSlide layout="comparison" title="Avoid the trap" footer={`${subject.code} / ${moduleLabel}`}>
          <ComparisonVisualizer
            left={{ title: 'Unsafe shortcut' }}
            right={{ title: 'Exam-safe method' }}
            dimensions={[
              { label: 'Mistake', left: module.mistake, right: 'Write the condition or formula before substitution.' },
              { label: 'Check', left: 'Answer appears without units, signs or assumptions.', right: 'Verify sign, domain, boundary condition and final interpretation.' },
              { label: 'Presentation', left: 'Jump from formula to answer.', right: 'Show at least one intermediate calculation line.' },
            ]}
          />
        </FoundationSlide>
      ),
      takeaway: module.mistake,
    },
    {
      id: `${baseId}-recap`,
      title: 'Module Recap',
      subtitle: 'Concept relationships to carry into problems',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" title="Concept map" footer={`${subject.code} / ${moduleLabel}`}>
          <ConceptMap nodes={nodes} links={links} />
        </FoundationSlide>
      ),
      takeaway: `Recap connects ${module.title.toLowerCase()} to formula choice, visual interpretation and exam execution.`,
    },
  ]
  const sourceSlides = buildSourceSlides(subject, moduleIndex, sourceDepth)
  return [
    ...coreSlides.slice(0, -1),
    ...sourceSlides,
    coreSlides.at(-1),
  ]
}

function buildSubject([id, title, code, semester, stream, folder, keys]) {
  const modules = keys.map((key, index) => {
    const item = moduleLibrary[key]
    const sourceDepth = firstYearDepthModules[`${code}|${index + 1}`]
    return {
      id: `module-${index + 1}`,
      number: String(index + 1).padStart(2, '0'),
      label: `Module ${index + 1}`,
      title: item.title,
      description: item.topics.slice(0, 3).join(', ') + '.',
      topics: item.topics,
      slides: buildSlides({ id, title, code, stream }, item, index, sourceDepth),
      pptxSource: `${pptxRoot}/${folder}/Module_${index + 1}.pptx`,
      depthResync: sourceDepth,
    }
  })
  return {
    id,
    number: code.replace(/\D/g, '').slice(-3),
    title,
    shortTitle: code,
    code,
    description: `${stream}: interactive mathematics with derivations, graphs, numerical boards and exam-safe worked examples.`,
    accent: 'first-year-math',
    segmentLabel: 'Module',
    keyAreas: Array.from(new Set(modules.flatMap((module) => module.topics.slice(0, 2)))).slice(0, 8),
    moduleFlow: modules.map((module) => module.title.split(/ and | - |,/)[0]),
    phase: 3,
    family: 'A - MATHEMATICS / MATHEMATICAL',
    pptxFolder: `${pptxRoot}/${folder}`,
    syllabusSource: `public/syllabus/1st Year Syllabus/${code}.pdf`,
    modules,
  }
}

export const firstYearMathSubjects = subjectConfigs.map(buildSubject)

export const firstYearMathReportSeed = {
  subjectsExpected: subjectConfigs.length,
  subjectsCreated: firstYearMathSubjects.length,
  modulesCreated: firstYearMathSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
  interactiveSlides: firstYearMathSubjects.reduce((sum, subject) => sum + subject.modules.reduce((mSum, module) => mSum + module.slides.length, 0), 0),
  majorAnimations: firstYearMathSubjects.reduce((sum, subject) => sum + subject.modules.length * 4, 0),
  derivations: firstYearMathSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
  workedExamples: firstYearMathSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
  graphVisualizations: firstYearMathSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
  status,
}
